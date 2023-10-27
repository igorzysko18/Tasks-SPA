const express = require('express');
const router = express.Router();
const { verifyApiKey, verifyBearerKey } = require('../lib/auth');

const { createUser,userLogin,updateUser} = require('../controllers/usersController');
const userValidator = require('../validators/usersValidator');

router.post('', verifyApiKey('users'), userValidator.validateCreateUser, createUser);
router.post('/login', verifyApiKey('users'), userValidator.validateLogin, userLogin);
router.put('/:id',verifyApiKey('users'), userValidator.validateUpdateUser, updateUser);
//router.delete('/users/:id', userController.deleteUser);

module.exports = router;
