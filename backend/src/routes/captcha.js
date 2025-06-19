const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const operator = '+';
  const question = `${num1} ${operator} ${num2}`;
  const answer = num1 + num2;

  res.json({
    captchaText: question,
    captchaAnswer: answer,
  });
});

module.exports = router;
