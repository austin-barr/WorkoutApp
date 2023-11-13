const express = require('express');
const app = express();
const loginRouter = require('./login');
const signupRouter = require('./signup');
const utilsRouter = require('./utils');
const authRouter = require('./check_auth');
require('dotenv').config()

app.use(express.json());

app.use('/api', loginRouter);
app.use('/api', signupRouter);
app.use('/api', utilsRouter);
app.use('/api', authRouter)

app.listen(3001, () => {console.log("Server started on port 3001")});