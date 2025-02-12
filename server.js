require('dotenv').config(); 
// const getConnection = require('./database');

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const dotenv =require("dotenv");
const { connectDatabase, getConnection } = require('./database');

connectDatabase();

app.get('/ping', (req, res) => {
    res.send('Pong!');
});

app.get('/', (req, res) => {
    console.log(getConnection());
    res.send(`Database is ${getConnection()}`);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});