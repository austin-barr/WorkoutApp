const express = require('express');
const app = express();
const loginRouter = require('./login');
const signupRouter = require('./signup');
const utilsRouter = require('./utils');

app.use(express.json());

app.use('/api', loginRouter);
app.use('/api', signupRouter);
app.use('/api', utilsRouter);

app.listen(3001, () => {console.log("Server started on port 3001")});