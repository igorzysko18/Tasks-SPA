const tagModel = require('../models/tagsModel');

const tagController = {};

tagController.createTag = (req, res) => {
  const tagData = req.body;

  tagModel.createTag(tagData, (err, newTag) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao criar a tag.' });
    }
    res.status(201).json(newTag);
  });
};

tagController.updateTag = (req, res) => {
  const tagId = req.params.id;
  const updatedData = req.body;

  tagModel.updateTag(tagId, updatedData, (err, updatedTag) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao atualizar a tag.' });
    }
    res.status(200).json(updatedTag);
  });
};

tagController.deleteTag = (req, res) => {
  const tagId = req.params.id;

  tagModel.deleteTag(tagId, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao excluir a tag.' });
    }
    res.status(204).end();
  });
};

tagController.findTagById = (req, res) => {
  const tagId = req.params.id;

  tagModel.findTagById(tagId, (err, tag) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar a tag.' });
    }
    if (!tag) {
      return res.status(404).json({ error: 'Tag não encontrada.' });
    }
    res.status(200).json(tag);
  });
};

tagController.findTagsByTaskId = (req, res) => {
    const taskId = req.params.task_id;
  
    tagModel.findTagsByTaskId(taskId, (err, tags) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao buscar as tags.' });
      }
      res.status(200).json(tags);
    });
  };

module.exports = tagController;
