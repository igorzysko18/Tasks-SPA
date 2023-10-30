const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('spaDb.db');
const jwt = require('jsonwebtoken');
const secretKey = '788847503fb7054ab1fa63e0ca9e4252';

exports.verifyApiKey = (user) => {
  return (req, res, next) => {
    let apiKey = req.get('Authorization');

    if (!apiKey || !apiKey.startsWith('api-key ')) {
      return res.status(401).json({ error: 'Api Key não fornecida.' });
    }

    db.get('SELECT name FROM api_key WHERE key = ? AND name = ?', [apiKey.replace('api-key ', ''), user], (err, apiKeyRow) => {
      if (err) {
        return res.status(401).json({ error: 'Erro ao verificar a api-key.' });
      } else if (!apiKeyRow) {
        return res.status(401).json({ error: 'ApiKey inválida.' });
      } else {
        next();
      }
    });
  };
};

exports.verifyBearerKey = (req, res, next) => {

  let bearerToken = req.get('Authorization');

  if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Bearer Key não fornecida.' });
  }

  jwt.verify(bearerToken.replace('Bearer ', ''), secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Bearer Key inválida.' });
    }

     req.userId = decoded.userId;

    db.get('SELECT id FROM users WHERE id = ?', [req.userId], (err, userRow) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao verificar a Bearer Key.' });
      } else if (!userRow) {
        return res.status(401).json({ error: 'ID de usuário inválido na Bearer Key.' });
      } else {
        next();
      }
    });
  });
};