const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');

const app = express();
const port = 3001;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Define CORS options
const corsOptions = {
  origin: 'http://192.168.57.6:3000', // Allow requests from this origin
};

// Enable CORS with options
app.use(cors(corsOptions);

// Create a connection to the database
const dbConfig = {
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'FitnessApp',
};

// Route for handling the login request
app.post('/api/login', [
  check('username').notEmpty().isString().trim(),
  check('password').notEmpty().isString().trim(),
], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  console.log(req.body);
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hashSync(password, 10);
  console.log(hashedPassword);

  try {
    const connection = await mysql.createConnection(dbConfig);

    // Query the database to check if the user exists and the password is correct
    const [rows] = await connection.execute('SELECT id, password FROM Account WHERE username = ?', [username]);
    console.log(rows);

    if (rows.length === 0) {
      res.status(401).json({ message: 'User not found' });
    } else {
      const dbPassword = rows[0].password;
      const passwordMatch = await bcrypt.compare(password, dbPassword);

      if (passwordMatch) {
        const token = jwt.sign({ userId: rows[0].id }, 'your_secret_key');
        res.json({ token });
      } else {
        res.status(401).json({ message: 'Invalid password' });
      }
    }

    await connection.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route for handling the signup request
app.post('/api/signup', [
  check('username').notEmpty().isString().trim(),
  check('password').notEmpty().isString().trim(),
], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  console.log(req.body);
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hashSync(password, 10);
  console.log(hashedPassword);

  try {
    const connection = await mysql.createConnection(dbConfig);

    // Insert the user into the database
    const [result] = await connection.execute('INSERT INTO Account (username, password) VALUES (?, ?)', [username, hashedPassword]);
    console.log(result);

    res.status(201).json({ message: 'User registered successfully' });

    await connection.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Listen to API requests
app.listen(port, '192.168.57.6', () => {
  console.log(`Server listening on http://192.168.57.6:${port}`);
});
