const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('spaDb.db');

const tagModel = {};

tagModel.createTag = (tagData, callback) => {
  let { title, task_id, user_id } = tagData;

  db.run(
    'INSERT INTO tags (title, task_id, user_id) VALUES (?, ?, ?)',
    [title, task_id, user_id],
    function (err) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, { id: this.lastID, title, task_id });
      }
    }
  );
};

tagModel.updateTag = (tagId, updatedData, callback) => {
    let { title } = updatedData;
  
    db.run(
      'UPDATE tags SET title = ? WHERE id = ?',
      [title, tagId],
      function (err) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, { id: tagId, title });
        }
      }
    );
  };
  
  tagModel.deleteTag = (tagId, callback) => {
    db.run('DELETE FROM tags WHERE id = ?', [tagId], function (err) {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    });
  };
  
  tagModel.findTagById = (tagId, callback) => {
    let query = 'SELECT * FROM tags WHERE id = ?';
  
    db.get(query, [tagId], (err, tag) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, tag);
      }
    });
  };

tagModel.findTagsByTaskId = (task_id, callback) => {
  let query = 'SELECT * FROM tags WHERE task_id = ?';

  db.all(query, [task_id], (err, tags) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, tags);
    }
  });
};

module.exports = tagModel;
