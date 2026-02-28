const jwt = require('jsonwebtoken');
const { secretKey } = require('../utils/secret');

const ADMIN_USER = {
  username: 'admin',
  password: '1234',
};

async function login(req, res) {
  const { username, password } = req.body || {};

  if (username === ADMIN_USER.username && password === ADMIN_USER.password) {
  
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
    return res.status(200).json({ token });
  }

  return res.status(400).json({ message: 'Credenciales inválidas' });
}

module.exports = { login };
