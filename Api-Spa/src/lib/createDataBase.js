const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('spaDb.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      username TEXT,
      password TEXT,
      create_date DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
  console.log('Tabela de users criada');
  db.run('CREATE TABLE IF NOT EXISTS api_key (key TEXT PRIMARY KEY, name TEXT)');
  const stmt = db.prepare('INSERT INTO api_key (key, name) VALUES (?, ?)');
  stmt.run('9eab1346361275b28203c3c67dc0114a', 'users');
  stmt.finalize();    
  console.log('Tabela de api criada');

  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY,
      title TEXT,
      description TEXT,
      dateTime DATETIME,
      durationTime TEXT,
      user_id INTEGER,
      FOREIGN KEY (user_id) REFERENCES users (id)
  )`);
  console.log('Tabela de tasks criada');

  db.run(`
  CREATE TABLE IF NOT EXISTS tags (
    id INTEGER PRIMARY KEY,
    title TEXT,
    task_id INTEGER,
    FOREIGN KEY (task_id) REFERENCES tasks (id)
  )`);
  console.log('Tabela de tags criada');

});



db.close();
