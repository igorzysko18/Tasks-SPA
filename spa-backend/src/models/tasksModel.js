const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('spaDb.db');

const taskModel = {};

taskModel.createTask = (taskData, callback) => {
  let { title, description, dateTime, status, durationTime, user_id } = taskData;
  
  db.run(
    'INSERT INTO tasks (title, description, dateTime, status, durationTime, user_id) VALUES (?, ?, ?, ?, ?, ?)',
    [title, description, dateTime, status, durationTime, user_id],
    function (err) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, { id: this.lastID, title, description, dateTime, durationTime, user_id });
      }
    }
  );
};

taskModel.getTaskById = (taskId, callback) => {
  db.get('SELECT * FROM tasks WHERE id = ?', [taskId], (err, task) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, task);
    }
  });
};

taskModel.updateTask = (taskId, taskData, callback) => {
  let { title, description, dateTime, status, durationTime } = taskData;

  db.run(
    'UPDATE tasks SET title = ?, description = ?, dateTime = ?, status = ?, durationTime = ? WHERE id = ?',
    [title, description, dateTime, status, durationTime, taskId],
    function (err) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, { id: taskId, title, description, dateTime, durationTime });
      }
    }
  );
};

taskModel.deleteTask = (taskId, callback) => {
  db.run('DELETE FROM tasks WHERE id = ?', [taskId], function (err) {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  });
};

taskModel.findTasksByUserId = (userId, callback) => {
    db.all('SELECT * FROM tasks WHERE user_id = ?', [userId], (err, tasks) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, tasks);
    });
  };

module.exports = taskModel;