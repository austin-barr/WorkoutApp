const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const cors = require('cors');

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

// Route for handling the login request
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

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
      'SELECT Username FROM Account WHERE username = ? AND password = ?',
      [username, password]
    );
    console.log(rows);
    // If the query returned a result, generate a JWT and send it back to the client
    if (rows.length > 0) {
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
