const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('spaDb.db');

const userModel = {};

userModel.createUser = (userData, callback) => {
  const { username, password, create_date } = userData;

  db.run(
    'INSERT INTO users (username, password, create_date) VALUES (?, ?, ?)',
    [username, password, new Date().toISOString()],
    function (err) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, { id: this.lastID, username, create_date });
      }
    }
  );
};

userModel.getUserById = (userId, callback) => {
  db.get('SELECT * FROM users WHERE id = ?', [userId], (err, row) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, row);
    }
  });
};

userModel.updateUser = (userId, updatedUserData, callback) => {
    const { username, password} = updatedUserData;
    db.run(
      'UPDATE users SET username = ?, password = ? WHERE id = ?',
      [username, password, userId],
      function (err) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, { id: userId, username});
        }
      }
    );
  };
  
  userModel.deleteUser = (userId, callback) => {
    db.run('DELETE FROM users WHERE id = ?', [userId], function (err) {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    });
  };

  userModel.findByUsername = (username, callback) => {
    db.get('SELECT * FROM users WHERE username = ?', username, (err, row) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, row);
      }
    });
  };


module.exports = userModel;
