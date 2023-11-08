const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const loginRouter = require('./login');
const signupRouter = require('./signup');

const dbConfig = {
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'FitnessApp',
};




const app = express();
const port = 3001;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Define CORS options
const corsOptions = {
  origin: 'http://192.168.57.6:3000', // Allow requests from this origin
};

// Enable CORS with options
//app.use(cors(corsOptions));

// Use the login and signup routes
app.use('/api', loginRouter);
app.use('/api', signupRouter);


// Listen to API requests
app.listen(port, '127.0.0.1', () => {
  console.log(`Server listening on http://192.168.57.6:${port}`);
});

