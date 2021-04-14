const axios = require('axios');
const express = require('express');
const serverless = require('serverless-http')

const app = express();
const router = express.Router();

const config = require('../config/config.js');
const url = config.server;
const token = config.token;

const cors = require('cors');
app.use(cors());

router.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
});

router.get('/forecast', (req, res) => {
  var city = req.query.city;
  axios.get(`${url}/forecast?q=${city}&appid=${token}&units=metric`)
  .then((response) => {
    res.send(response.data);
  })
  .catch((err) => {
    console.log(err);
  })
});

router.get('/weather', (req, res) => {
  var city = req.query.city;
  axios.get(`${url}/weather?q=${city}&appid=${token}&units=metric`)
  .then((response) => {
    res.send(response.data);
  })
  .catch((err) => {
    console.log(err);
  })
});

app.use('/.netlify/functions/app', router);

module.exports.handler = serverless(app);

