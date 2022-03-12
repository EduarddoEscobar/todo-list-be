const express = require('express');
const cors = require('cors');
const session = require('express-session');
const helmet = require('helmet');
const todoRouter = require('./todos/todo-router');
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

server.use(session(sessionConfig));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use('/api/todos', todoRouter);

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        customMessage: err.customMessage,
        message: err.message,
        stack: message.stack
    })
})

module.exports = app;
