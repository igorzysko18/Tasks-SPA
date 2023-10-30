const tagModel = require('../models/tagsModel');

const tagController = {};

tagController.createTag = (req, res) => {
  let tagData = {...req.body, user_id: req.userId };

  tagModel.createTag(tagData, (err, newTag) => {
    if (err) {
      if (err.message.includes('UNIQUE constraint failed')) {
        return res.status(409).json({ message: 'Já existe uma tag com o mesmo nome nesta tarefa.' });
      } else {
        return res.status(500).json({ message: 'Erro ao criar a tag.' });
      }    
    }
    res.status(201).json(newTag);
  });
};

tagController.updateTag = (req, res) => {
  let tagId = req.params.id;
  let updatedData = req.body;

  tagModel.updateTag(tagId, updatedData, (err, updatedTag) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao atualizar a tag.' });
    }
    res.status(200).json(updatedTag);
  });
};

tagController.deleteTag = (req, res) => {
  let tagId = req.params.id;

  tagModel.deleteTag(tagId, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao excluir a tag.' });
    }
    res.status(204).end();
  });
};

tagController.findTagById = (req, res) => {
  let tagId = req.params.id;

  tagModel.findTagById(tagId, (err, tag) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao buscar a tag.' });
    }
    if (!tag) {
      return res.status(404).json({ message: 'Tag não encontrada.' });
    }
    res.status(200).json(tag);
  });
};

tagController.findTagsByTaskId = (req, res) => {
    let taskId = req.params.task_id;
  
    tagModel.findTagsByTaskId(taskId, (err, tags) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao buscar as tags.' });
      }
      res.status(200).json(tags);
    });
  };

module.exports = tagController;
