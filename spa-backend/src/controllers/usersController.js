const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userModel = require('../models/usersModel');
const secretKey = '788847503fb7054ab1fa63e0ca9e4252';

exports.createUser = (req, res) => {
  let userData = req.body; 

  userModel.findByUsername(userData.username, (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao fazer login.' });
    }
    if (!user) {
      bcrypt.hash(userData.password, 10, (hashErr, hashedPassword) => {
        if (hashErr) {
          return res.status(500).json({ message: 'Erro ao criar o usuário.' });
        }
    
        userData.password = hashedPassword;
    
        userModel.createUser(userData, (createErr, newUser) => {
          if (createErr) {
            return res.status(500).json({ message: 'Erro ao criar o usuário.' });
          }
          res.status(201).json(newUser);
        });
      });
    } else {
      return res.status(409).json({ message: 'Nome de usuário já cadastrado em nossa base.' });
      }
  });
};


exports.userLogin = (req, res) => {
    let { username, password } = req.body;
  
    userModel.findByUsername(username, (err, user) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao fazer login.' });
      }
      if (!user) {
        return res.status(401).json({ message: 'Usuário não encontrado.' });
      }
      bcrypt.compare(password, user.password, (bcryptErr, passwordMatch) => {
        if (bcryptErr) {
          return res.status(500).json({ message: 'Erro ao verificar a senha.' });
        }
  
        if (passwordMatch) {
          let token = jwt.sign({ userId: user.id, userName: user.name }, secretKey, { expiresIn: '1h' });
          return res.status(200).json({ message: 'Login bem-sucedido', token: token, userName: user.name });
        } else {
          return res.status(401).json({ message: 'Senha incorreta.' });
        }
      });
    });
  };

  exports.updateUser = (req, res) => {
    let userId = req.params.id; 
    let userData = req.body; 
  
    bcrypt.hash(userData.password, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao criar a senha segura.' });
      }

      userData.password = hashedPassword;

        userModel.updateUser(userId, userData, (err, updatedUser) => {
        if (err) {
          return res.status(500).json({ message: 'Erro ao atualizar a senha do usuário.' });
        }
        res.status(200).json({ message: 'Senha do usuário atualizada com sucesso.', updatedUser });
      });
    });
  };