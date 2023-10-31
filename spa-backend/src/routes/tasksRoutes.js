const express = require('express');
const router = express.Router();
const taskController = require('../controllers/tasksController');
const tasksValidator = require('../validators/tasksValidator');
const { verifyBearerKey } = require('../lib/auth');

router.post('', verifyBearerKey, tasksValidator.validateCreateTask, taskController.createTask);
router.get('/:id', verifyBearerKey, taskController.getTaskById);
router.get('', verifyBearerKey, taskController.getTasksByUserId);
router.put('/:id', verifyBearerKey, tasksValidator.validateUpdateTask, taskController.updateTask);
router.delete('/:id', verifyBearerKey,tasksValidator.validateDeleteTask, taskController.deleteTask);

module.exports = router;
