require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { drizzle } = require('drizzle-orm/neon-http');
const { neon } = require('@neondatabase/serverless');
const { eq } = require('drizzle-orm');

const {
  employees,
  userLogin,
  tentativeEmployees,
  bankDetails,
  leaveApplications
} = require('./db/schema');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;
const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

/* ---------------------- CAPTCHA ---------------------- */
app.get('/api/captcha', (req, res) => {
  const a = Math.floor(Math.random() * 10);
  const b = Math.floor(Math.random() * 10);
  res.json({ captchaText: `${a} + ${b} = ?`, captchaAnswer: a + b });
});

/* ------------------ Auth Middleware ------------------ */
function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Missing token' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}

/* ---------------- EMPLOYEE REGISTER ---------------- */
app.post('/employee/register', async (req, res) => {
  const { firstName, lastName, personalEmail } = req.body;
  if (!firstName || !lastName || !personalEmail) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const inserted = await db.insert(tentativeEmployees).values({
      firstName,
      lastName,
      personalEmail
    }).returning();
    res.json({ success: true, employeeId: inserted[0].id });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed' });
  }
});

/* ------------------ EMPLOYEE LOGIN ------------------ */
app.post('/employee/login', async (req, res) => {
  const { employeeId, password } = req.body;
  try {
    const [user] = await db.select().from(userLogin).where(eq(userLogin.employeeId, +employeeId));
    if (!user || user.role !== 'employee') {
      return res.status(401).json({ message: 'Invalid employee credentials' });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign({ employeeId, role: 'employee' }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { employeeId, role: 'employee' } });
  } catch (err) {
    res.status(500).json({ message: 'Login error' });
  }
});

/* -------------------- HR LOGIN -------------------- */
app.post('/login/hr', async (req, res) => {
  const { employeeId, password } = req.body;
  try {
    const [user] = await db.select().from(userLogin).where(eq(userLogin.employeeId, +employeeId));
    if (!user || user.role !== 'hr') return res.status(401).json({ message: 'Invalid HR credentials' });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign({ employeeId, role: 'hr' }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { employeeId, role: 'hr' } });
  } catch (err) {
    res.status(500).json({ message: 'Login error' });
  }
});

/* ----------- HR: Approve or Reject Employee ----------- */
app.get('/hr/pending-approvals', async (req, res) => {
  const data = await db.select().from(tentativeEmployees);
  res.json(data);
});

app.post('/hr/approve', async (req, res) => {
  const { id, action } = req.body;

  const [emp] = await db.select().from(tentativeEmployees).where(eq(tentativeEmployees.id, id));
  if (!emp) return res.status(404).json({ message: 'Not found' });

  if (action === 'approve') {
    let baseEmail = `${emp.firstName.toLowerCase()}.${emp.lastName.toLowerCase()}@eil.co.in`;
    let email = baseEmail;

    const existing = await db.select().from(employees).where(eq(employees.orgEmail, email));
    if (existing.length > 0) {
      email = `${emp.firstName.toLowerCase()}.${emp.lastName.toLowerCase()}${emp.id}@eil.co.in`;
    }

    const password = Math.random().toString(36).slice(-8);
    const passwordHash = await bcrypt.hash(password, 12);

    const [inserted] = await db.insert(employees).values({
      orgEmail: email,
      firstName: emp.firstName,
      lastName: emp.lastName,
      personalEmail: emp.personalEmail,
    }).returning();

    await db.insert(userLogin).values({
      employeeId: inserted.employeeId,
      passwordHash,
      role: 'employee',
    });

    await db.delete(tentativeEmployees).where(eq(tentativeEmployees.id, id));

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS }
    });

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: emp.personalEmail,
      subject: 'EIL Registration Approved',
      text: `Welcome to EIL.\nOfficial Email: ${email}\nPassword: ${password}`
    });

    return res.json({ message: '✅ Approved and notified successfully.' });
  } else {
    await db.delete(tentativeEmployees).where(eq(tentativeEmployees.id, id));
    return res.json({ message: '❌ Rejected and deleted.' });
  }
});

/* ------------------- PROFILE ------------------- */
app.get('/employee/profile', verifyToken, async (req, res) => {
  const { employeeId } = req.user;
  const [data] = await db.select().from(employees).where(eq(employees.employeeId, +employeeId));
  res.json(data);
});

app.put('/employee/update-profile', verifyToken, async (req, res) => {
  const { employeeId } = req.user;

  try {
    const {
      phone, dob, address, gender,
      dept, adhaarNo, panNo,
      firstName, lastName, personalEmail
    } = req.body;

    const updateFields = {
      ...(phone && { phone }),
      ...(dob && { dob: new Date(dob) }),
      ...(address && { address }),
      ...(gender && { gender }),
      ...(dept && { dept }),
      ...(adhaarNo && { adhaarNo }),
      ...(panNo && { panNo }),
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      ...(personalEmail && { personalEmail }),
      updatedAt: new Date()
    };

    await db.update(employees)
      .set(updateFields)
      .where(eq(employees.employeeId, +employeeId));

    res.json({ message: '✅ Profile updated successfully' });
  } catch (error) {
    console.error('❌ Profile update error:', error);
    res.status(500).json({ message: '❌ Failed to update profile' });
  }
});

/* ------------------- BANK DETAILS ------------------- */
app.post('/employee/bank', verifyToken, async (req, res) => {
  const { employeeId } = req.user;
  const { accountNumber, ifsc, bankName } = req.body;

  const existing = await db.select().from(bankDetails).where(eq(bankDetails.employeeId, employeeId));
  if (existing.length > 0) {
    return res.status(400).json({ message: 'Bank details already submitted' });
  }

  await db.insert(bankDetails).values({
    employeeId,
    accountNumber,
    ifsc,
    bankName
  });

  res.json({ message: '✅ Bank details submitted successfully' });
});

app.get('/employee/bank', verifyToken, async (req, res) => {
  const { employeeId } = req.user;
  const details = await db.select().from(bankDetails).where(eq(bankDetails.employeeId, employeeId));
  if (details.length === 0) return res.status(204).send();
  res.json(details[0]);
});

/* ------------------- LEAVE REQUEST ------------------- */
app.post('/employee/leave', verifyToken, async (req, res) => {
  const { employeeId } = req.user;
  const { fromDate, toDate, reason } = req.body;

  await db.insert(leaveApplications).values({
    employeeId,
    fromDate,
    toDate,
    reason
  });

  res.json({ message: 'Leave submitted' });
});

app.get('/employee/leave-history', verifyToken, async (req, res) => {
  const { employeeId } = req.user;
  const history = await db
    .select()
    .from(leaveApplications)
    .where(eq(leaveApplications.employeeId, +employeeId));
  res.json(history);
});

/* -------------------- HR VIEWS -------------------- */
app.get('/hr/bank-details', async (req, res) => {
  const data = await db.select().from(bankDetails);
  res.json(data);
});

app.get('/hr/leaves', async (req, res) => {
  const data = await db.select().from(leaveApplications);
  res.json(data);
});

/* -------------------- Start Server -------------------- */
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
