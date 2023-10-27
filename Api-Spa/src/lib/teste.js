const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('spaDb.db');

// Verifica se a tabela "users" existe
db.serialize(() => {
  db.get("SELECT * FROM users", (err, row) => {
    if (err) {
    } else if (row) {
    } else {
      console.log('A tabela "users" não existe.');
    }
  });
});

// Fecha o banco de dados após a verificação
db.close();