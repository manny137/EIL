require('dotenv').config();
const express = require('express');
const { drizzle } = require('drizzle-orm/neon-http');
const { neon } = require('@neondatabase/serverless');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { eq } = require('drizzle-orm');
const { userLogin } = require('./db/schema.js');

const app = express();

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());


//latersss
// app.post('/employee/register', async (req, res) => {
//   const { firstName, lastName, personalEmail } = req.body;

//   console.log('📥 Registration request received:', { firstName, lastName, personalEmail });

//   if (!firstName || !lastName || !personalEmail) {
//     console.log('❌ Missing required fields');
//     return res.status(400).json({ success: false, message: 'Missing required fields' });
//   }

//   try {
//     const result = await db
//       .insert(tentativeEmployees)
//       .values({ firstName, lastName, personalEmail })
//       .returning({ id: tentativeEmployees.id });

//     const inserted = result[0];
//     console.log('✅ Employee inserted:', inserted);

//     res.status(200).json({ success: true, employeeId: inserted.id });
//   } catch (error) {
//     console.error('❌ Error inserting into database:', error);
//     res.status(500).json({ success: false, message: 'Registration failed' });
//   }
// });


// app.get('/api/captcha', (req, res) => {
//   const num1 = Math.floor(Math.random() * 10) + 1;
//   const num2 = Math.floor(Math.random() * 10) + 1;
//   const question = `${num1} + ${num2} =`;
//   const answer = num1 + num2;

//   res.json({ captchaText: question, captchaAnswer: answer });
// });


app.post('/test', async(req, res) => {
  const { password, role } = req.body;

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    await db.insert(userLogin).values({
      passwordHash,
      role,
    });

    console.log('✅ Test user created');
    res.json({ message: `${role} creation successful`});
  } catch (err) {
    console.error('❌ Error creating test user:', err);
  }
});

app.post('/login', async (req, res) => {
  const { employeeId, password, role } = req.body;

  try {
    const [user] = await db.select().from(userLogin).where(
      eq(userLogin.employeeId, employeeId)
    );

    if (!user || user.role !== role) {
      return res.status(401).json({ message: 'Invalid credentials or role' });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);

    if (!valid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({ message: `${role} login successful`, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error yeah' });
  }
});
// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
