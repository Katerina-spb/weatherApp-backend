const axios = require('axios');
const express = require('express');
const app = express();
const path = require('path');
const port = 3001;

const config = require('./config/config.js');
const url = config.server;
const token = config.token;
const cors = require('cors');


app.use(express.static(path.join(__dirname, "/public")));
app.use(cors());

app.get('/forecast', (req, res) => {
  var city = req.query.city;
  axios.get(`${url}/forecast?q=${city}&appid=${token}&units=metric`)
  .then((response) => {
    res.send(response.data);
  })
  .catch((err) => {
    console.log(err);
  })
})

app.get('/weather', (req, res) => {
  var city = req.query.city;
  axios.get(`${url}/weather?q=${city}&appid=${token}&units=metric`)
  .then((response) => {
    res.send(response.data);
  })
  .catch((err) => {
    console.log(err);
  })
})

app.listen(port, () =>
  console.log(`listening on http://localhost:${port}`)
);

