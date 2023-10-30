const { param, body, validationResult } = require('express-validator');

exports.validateCreateTag = [
  body('title')
    .isString()
    .withMessage('O título da tag deve ser uma string.')
    .isLength({ min: 3, max: 20 })
    .withMessage('O título da tag deve ter entre 3 e 20, caracteres.'),
  body('task_id')
    .isInt()
    .withMessage('O ID da tarefa deve ser um número inteiro.')
    .custom((value) => {
      if (value <= 0) {
        throw new Error('O ID da tarefa deve ser maior que zero.');
      }
      return true;
    }),
  body('user_id')
    .isInt()
    .withMessage('O ID do usuário deve ser um número inteiro.')
    .custom((value) => {
      if (value <= 0) {
        throw new Error('O ID do usuário deve ser maior que zero.');
      }
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

exports.validateUpdateTag = [
    param('id')
      .isInt()
      .withMessage('O ID da tag deve ser um número inteiro.')
      .custom((value) => {
        if (value <= 0) {
          throw new Error('O ID da tag deve ser maior que zero.');
        }
        return true;
      }),
    body('title')
      .optional()
      .isString()
      .withMessage('O título da tag deve ser uma string.')
      .isLength({ min: 3, max: 255 })
      .withMessage('O título da tag deve ter entre 3 e 255 caracteres.'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ];
