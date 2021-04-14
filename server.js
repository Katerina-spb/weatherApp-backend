const axios = require('axios');
const express = require('express');
const serverless = require('serverless-http')

const app = express();
const routes = express.Router();

const config = require('./config/config.js');
const url = config.server;
const token = config.token;
const cors = require('cors');


app.use(cors());
app.use('/', router);

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
});

app.get('/forecast', (req, res) => {
  var city = req.query.city;
  axios.get(`${url}/forecast?q=${city}&appid=${token}&units=metric`)
  .then((response) => {
    res.send(response.data);
  })
  .catch((err) => {
    console.log(err);
  })
});

app.get('/weather', (req, res) => {
  var city = req.query.city;
  axios.get(`${url}/weather?q=${city}&appid=${token}&units=metric`)
  .then((response) => {
    res.send(response.data);
  })
  .catch((err) => {
    console.log(err);
  })
});

module.exports.handler = serverless(app);

