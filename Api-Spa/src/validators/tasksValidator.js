const { body, validationResult } = require('express-validator');

const isHourFormat = (value) => {
  if (!/^\d+(\.\d+)?$/.test(value)) {
    throw new Error('A duração deve estar no formato de horas (por exemplo, "1.5" para 1 hora e 30 minutos).');
  }
  return true;
};

exports.validateCreateTask = [
  body('title')
    .isString()
    .notEmpty()
    .withMessage('O título é obrigatório.'),
  body('description')
    .isString(),
  body('dateTime')
    .isISO8601()
    .withMessage('Data e hora inválidas.'),
  body('durationTime')
    .matches(/^\d{1,2}:\d{2}$/)
    .withMessage('A duração deve estar no formato de horas.'),
  body('user_id')
    .isInt()
    .withMessage('ID do usuário inválido.'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.validateUpdateTask = [
  body('title')
    .isString()
    .optional(),
  body('description')
    .isString()
    .optional(),
  body('dateTime')
    .isISO8601()
    .optional(),
  body('durationTime')
    .matches(/^\d{1,2}:\d{2}$/)
    .withMessage('A duração deve estar no formato de horas.'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
