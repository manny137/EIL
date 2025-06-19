require('dotenv').config({ path: '../.env' });
const express = require('express');
const { drizzle } = require('drizzle-orm/neon-http');
const { neon } = require('@neondatabase/serverless');
const cors = require('cors');
const { tentativeEmployees } = require('./db/schema.js');

const app = express();

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

app.post('/employee/register', async (req, res) => {
  const { firstName, lastName, personalEmail } = req.body;

  console.log('📥 Registration request received:', { firstName, lastName, personalEmail });

  if (!firstName || !lastName || !personalEmail) {
    console.log('❌ Missing required fields');
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  try {
    const result = await db
      .insert(tentativeEmployees)
      .values({ firstName, lastName, personalEmail })
      .returning({ id: tentativeEmployees.id });

    const inserted = result[0];
    console.log('✅ Employee inserted:', inserted);

    res.status(200).json({ success: true, employeeId: inserted.id });
  } catch (error) {
    console.error('❌ Error inserting into database:', error);
    res.status(500).json({ success: false, message: 'Registration failed' });
  }
});


app.get('/api/captcha', (req, res) => {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const question = `${num1} + ${num2} =`;
  const answer = num1 + num2;

  res.json({ captchaText: question, captchaAnswer: answer });
});

const users = {
  hr: [
    { id: 1, username: 'hr1', password: 'password1' },
    { id: 2, username: 'hr2', password: 'password2' }
  ],
  employee: [
    { id: 1, username: 'emp1', password: 'password1' },
    { id: 2, username: 'emp2', password: 'password2' }
  ]
};

app.post('/hr/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.hr.find(u => u.username === username && u.password === password);

  if (user) {
    res.json({ message: 'HR login successful', user });
  } else {
    res.status(401).json({ message: 'Invalid HR credentials' });
  }
});

app.post('/employee/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.employee.find(u => u.username === username && u.password === password);

  if (user) {
    res.json({ message: 'Employee login successful', user });
  } else {
    res.status(401).json({ message: 'Invalid employee credentials' });
  }
});

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
