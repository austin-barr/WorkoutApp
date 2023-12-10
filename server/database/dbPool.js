const mariadb = require('mysql2');

try {
  db = mariadb.createPool({
    host: '192.168.56.101',
    user: 'webAppUser',
    password: 'r0ckandst0ne',
    database: 'WorkoutApp',
    connectionLimit: 10,
    multipleStatements: true
  });
}
catch (err) {
  throw err
}

module.exports = db.promise();
