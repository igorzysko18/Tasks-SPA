const express = require('express');
const router = express.Router();
const { verifyBearerKey } = require('../lib/auth');
const tagController = require('../controllers/tagsController');
const tagValidator = require('../validators/tagsValidator');

router.post('', verifyBearerKey,tagValidator.validateCreateTag, tagController.createTag);
router.get('/tasks/:task_id', verifyBearerKey, tagController.findTagsByTaskId);
router.get('/:id', verifyBearerKey, tagController.findTagById);
router.put('/:id', verifyBearerKey, tagValidator.validateUpdateTag, tagController.updateTag);
router.delete('/:id', verifyBearerKey, tagController.deleteTag);

module.exports = router;
