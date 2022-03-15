const { restricted } = require('./middleware/index');
const session = require('express-session');
const express = require('express');
const cors = require('cors');
const usersRouter = require('./users/users-router');
const todoRouter = require('./todos/todo-router');
const authRouter = require('./auth/auth-router');
const helmet = require('helmet');

const app = express();

const sessionConfig = {
    name: 'chocolatechip',
    secret: process.env.sessionSecret || 'shh',
    cookie: { 
        maxAge: 1000 * 60 * 60,
        secure: false,
        httpOnly: true
    },
    resave: false, 
    saveUninitialized: false
}

app.use(session(sessionConfig));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use('/api/todos', restricted, todoRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', restricted, usersRouter);

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        custom_message: err.customMessage,
        message: err.message,
        stack: err.stack
    })
})

module.exports = app;
