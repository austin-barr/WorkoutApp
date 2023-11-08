const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/login', [
  check('username').notEmpty().isString().trim(),
  check('password').notEmpty().isString().trim(),
], async (req, res) => {
  const errors = validationResult(req);
  console.log("login hit");
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  console.log(req.body);
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  console.log(hashedPassword);
  // Create a connection to the database
  const connection = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'FitnessApp',
  });

  try {
    // Query the database to check if the user exists and the password is correct
    const [rows] = await connection.query(
      'SELECT * FROM Account WHERE username = ? ',
      [result]
    );
    console.log(result);
    // If the query returned a result, generate a JWT and send it back to the client
    
    const passwordMatch = await bcrypt.compare(password, result[0].password);
    if (passwordMatch) {
      const token = jwt.sign({ userId: rows[0].id }, 'your_secret_key');
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (err) {
    console.log("CATCH!");
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    // Close the database connection
    await connection.end();
  }
});

module.exports = router;

