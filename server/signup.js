const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

const dbConfig = {
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'FitnessApp',
};

router.post('/signup', [
  check('username').notEmpty().isString().trim(),
  check('password').notEmpty().isString().trim(),
], async (req, res) => {
  // Your signup route code here
});

module.exports = router;

