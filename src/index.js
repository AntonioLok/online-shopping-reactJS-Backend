/* eslint-disable no-console */
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const mongoose = require('mongoose');
const users = require('./views/routes/users');
const products = require('./views/routes/products');
const carts = require('./views/routes/carts');
const logRequest = require('./utils/middlewares/log-request');

const app = express();

mongoose.connect('mongodb://user123:user123@ds135704.mlab.com:35704/shopping_site', { useNewUrlParser: true });
const dbconnection = mongoose.connection;

// Handle mongo error
dbconnection.on('error', console.error.bind(console, 'connection error:'));
dbconnection.once('open', () => {
  console.log('We are connected');
});

// Allow cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, PATCH, DELETE, OPTIONS');
  next();
});

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Loggers
app.use(logRequest);

app.use('/users', users);
app.use('/products', products);
app.use('/carts', carts);

// Set Port
const port = process.env.PORT || '8000';
app.set('port', port);
const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));
