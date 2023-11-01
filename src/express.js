const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();
const port = 3001;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Define CORS options
const corsOptions = {
  origin: 'http://192.168.57.6:3000', // Allow requests from this origin
};

// Enable CORS with options
app.use(cors(corsOptions));


//Input sanitation
const { check, validationResult } = require('express-validator');

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
  // Create a connection to the database
  const connection = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'FitnessApp',
  });

  try {
    // Query the database to check if the user exists and the password is correct
    const [rows] = await connection.execute(
      'SELECT password FROM Account WHERE username = ? ',
      [username, password]
    );
    console.log(rows);
    // If the query returned a result, generate a JWT and send it back to the client
    const dbPassword = rows[0].password;
    const passwordMatch = await bcrypt.compare(password, dbPassword);
    if (passwordMatch) {
      const token = jwt.sign({ userId: rows[0].id }, 'your_secret_key');
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    // Close the database connection
    await connection.end();
  }
});

// Listen to api requests sent to http://192.168.57.6:3000/api/login
app.listen(port, '192.168.57.6', () => {
  console.log(`Server listening on http://192.168.57.6:${port}`);
});
