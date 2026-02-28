const jwt = require('jsonwebtoken');
const { secretKey } = require('../utils/secret');


function requireToken(req, res, next) {
  try {
    const authHeader = req.header('authorization');
    if (!authHeader) {
      return res.status(401).json({ message: 'Token no enviado' });
    }

    const token = authHeader.startsWith('Bearer ')
      ? authHeader.slice(7).trim()
      : authHeader.trim();

    if (!token) {
      return res.status(401).json({ message: 'Token no enviado' });
    }

    const payload = jwt.verify(token, secretKey);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' });
  }
}

module.exports = { requireToken };
