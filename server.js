const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const mongoose = require('mongoose');


// const bodyParser = require('body-parser');
require('dotenv').config();

// Port server listens on
const port = process.env.PORT || 3333;

// mongodb URI
const mongoURI = process.env.MONGODB_URI;
// connect to db
const connectToMongodb = () => {
  mongoose.connect(mongoURI, { useNewUrlParser: true, useCreateIndex: true });
  const conn = mongoose.connection;
  conn.once('open', () => {
    console.log("MongoDB connection established successfully!")
  })
};

// URIs for API endpoints
const baseURI = 'http://localhost:2376'
const containersURI = baseURI + '/containers/json';
const containersAllURI = baseURI + '/containers/json?all=1';
const imagesURI = baseURI + '/images/json';

const app = express();
app.use(cors());
app.use(express.json());

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);


app.listen(port, () => console.log(`Server is running on port ${port}.`));

app.get('/hello', (req, res) => res.send('hello'));

app.get('/images', (req, res) => {
  fetchJson(res, imagesURI);
});

app.get('/containers', (req, res) => {
  fetchJson(res, containersURI);
});

app.get('/containers/all', (req, res) => {
  fetchJson(res, containersAllURI);
});

app.get('/index', (req, res) => {
  res.send('<h1>Home</h1>');
})

const fetchJson = (res, url) => {
  fetch(url)
  .then((res) => {
    return res.json();
  })
  .then((json) => {
    res.json(json)
  });
};

connectToMongodb();