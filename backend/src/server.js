require('dotenv').config({ path: '../.env' });
const express = require('express');
const { drizzle } = require('drizzle-orm/neon-http');
const { neon } = require('@neondatabase/serverless');
const { employee } = require('./db/schema.js');

const app = express();
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

const sql = neon(process.env.DATABASE_URL);

const db = drizzle(sql);

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

app.post('/employee/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await db
      .insert(employee)
      .values({ username, password }) 
      .returning({ id: employee.id });

    const inserted = result[0];
    res.json({ success: true, employeeId: inserted.id });
  } catch (error) {
    console.error('Error registering employee:', error);
    res.status(500).json({ success: false, message: 'Registration failed' });
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

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
