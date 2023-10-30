const tasksModel = require('../models/tasksModel');

const taskController = {};

taskController.createTask = (req, res) => {
  let taskData = req.body;

  tasksModel.createTask(taskData, (err, newTask) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao criar a tarefa.' });
    }
    res.status(201).json(newTask);
  });
};

taskController.getTaskById = (req, res) => {
  let taskId = req.params.id;

  tasksModel.getTaskById(taskId, (err, task) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao buscar a tarefa.' });
    }

    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada.' });
    }

    res.status(200).json(task);
  });
};

taskController.updateTask = (req, res) => {
  let taskId = req.params.id;
  let taskData = req.body;

  tasksModel.updateTask(taskId, taskData, (err, updatedTask) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao atualizar a tarefa.' });
    }
    res.status(200).json(updatedTask);
  });
};

taskController.deleteTask = (req, res) => {
  let taskId = req.params.id;

  tasksModel.deleteTask(taskId, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao excluir a tarefa.' });
    }
    res.status(204).send();
  });
};  

  taskController.getTasksByUserId = (req, res) => {
    let userId = req.params.userId;
  
    tasksModel.findTasksByUserId(userId, (err, tasks) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao buscar tarefas do usuário.' });
      }
  
      res.status(200).json(tasks);
    });
  };


module.exports = taskController;
