const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/generate-password', (req, res) => {
  const { length, useUppercase, useLowercase, useNumbers, useSymbols } = req.body;

  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';

  let charPool = '';
  if (useUppercase) charPool += uppercase;
  if (useLowercase) charPool += lowercase;
  if (useNumbers) charPool += numbers;
  if (useSymbols) charPool += symbols;

  if (!charPool) {
    return res.status(400).json({ error: 'Select at least one character type.' });
  }

  let password = '';
  for (let i = 0; i < length; i++) {
    password += charPool[Math.floor(Math.random() * charPool.length)];
  }

  res.json({ password });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
