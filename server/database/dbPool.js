const mariadb = require('mysql2');
require('dotenv').config();

try {
  db = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10,
    multipleStatements: true
  });
}
catch (err) {
  throw err
}

module.exports = db.promise();
