const axios = require('axios');
const NodeCache = require('node-cache');
const apiCache = new NodeCache({ stdTTL: 600 });

const tasksModel = require('../models/tasksModel');

const taskController = {};

taskController.createTask = (req, res) => {
  let taskData = {...req.body, user_id: req.userId };

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

taskController.getTasksByUserId = async (req, res) => {
  let userId = req.userId;

  try {
    const tasks = await new Promise((resolve, reject) => {
      tasksModel.findTasksByUserId(userId, (err, tasks) => {
        if (err) {
          reject(err);
        }

        resolve(tasks);
      });
    });

    const holidaysByYear = {};

    for (const task of tasks) {
      const taskYear = new Date(task.dateTime).getFullYear();
      const cacheKey = `holidays-${taskYear}`;
      const cachedHolidays = apiCache.get(cacheKey);

      if (!holidaysByYear[taskYear]) {
        if (cachedHolidays) {
          holidaysByYear[taskYear] = cachedHolidays;
        } else {
          const apiUrl = `https://date.nager.at/api/v3/PublicHolidays/${taskYear}/BR`;
          const response = await axios.get(apiUrl);
          const holidays = response.data;
          holidaysByYear[taskYear] = holidays;
          apiCache.set(cacheKey, holidays);
        }
      }

      const holidays = holidaysByYear[taskYear];

      const taskDate = new Date(task.dateTime).toISOString().split('T')[0];
      const holiday = holidays.find(dayOff => dayOff.date === taskDate);
      if (holiday) {
        task.dayOff = holiday.localName;
      }
    }

    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar dados de feriados.' });
  }
};

async function fetchDataAndAddHolidays(userId, holidays) {
  const tasks = await new Promise((resolve, reject) => {
    tasksModel.findTasksByUserId(userId, (err, tasks) => {
      if (err) {
        reject(err);
      }

      tasks.forEach(task => {
        const taskDate = new Date(task.dateTime).toISOString().split('T')[0];
        const holiday = holidays.find(dayOff => dayOff.date === taskDate);
        if (holiday) {
          task.dayOff = holiday.localName;
        }
      });

      resolve(tasks);
    });
  });

  return tasks;
}


module.exports = taskController;
