const mysql = require('mysql2');

try {
  db = mysql.createPool({
    host: '192.168.56.101',
    user: 'webAppUser',
    password: 'r0ckandst0ne',
    database: 'WorkoutApp',
    connectionLimit: 10
  });
}
catch (err) {
  console.log(err)
}

module.exports = db.promise();