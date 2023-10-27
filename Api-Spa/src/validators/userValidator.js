const { param, body, validationResult } = require('express-validator');

exports.validateCreateUser = [
  body('username')
    .isString()
    .isLength({ min: 3 })
    .withMessage('O nome de usuário deve ter pelo menos 3 caracteres.'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('A senha deve ter pelo menos 8 caracteres.')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])/)
    .withMessage('A senha deve conter pelo menos um dígito, uma letra minúscula, uma letra maiúscula e um caractere especial.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

exports.validateLogin = [
  body('username')
    .isString()
    .isLength({ min: 3 })
    .withMessage('O nome de usuário não deve possuir menos 3 caracteres.'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('A senha não deve ter menos de 8 caracteres.'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.validateUpdateUser = [
  param('id')
    .isInt()
    .withMessage('ID de usuário inválido.'),
  body('username')
    .isString()
    .isLength({ min: 3 })
    .withMessage('O nome de usuário deve ter pelo menos 3 caracteres.'),
  body('password')
    .optional()
    .isLength({ min: 8 })
    .withMessage('A senha deve ter pelo menos 8 caracteres.')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])/)
    .withMessage('A senha deve conter pelo menos um dígito, uma letra minúscula, uma letra maiúscula e um caractere especial.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];