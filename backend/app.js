const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Dummy user data
const users = {
  hr: [
    { id: 1, username: 'hr1', password: 'password1',},
    { id: 2, username: 'hr2', password: 'password2',}
  ],
  employee: [
    { id: 1, username: 'emp1', password: 'password1',},
    { id: 2, username: 'emp2', password: 'password2',}
  ]
};

// HR Login route
app.post('/hr/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.hr.find(u => u.username === username && u.password === password);

  if (user) {
    // In a real application, generate a token or session here
    res.json({ message: 'hr login successful', user });
  } else {
    res.status(401).json({ message: 'invalid hr credentials' });
  }
});

// Employee Login route
app.post('/employee/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.employee.find(u => u.username === username && u.password === password);

  if (user) {
    // In a real application, generate a token or session here
    res.json({ message: 'employee login successful', user });
  } else {
    res.status(401).json({ message: 'invalid employee credentials' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

