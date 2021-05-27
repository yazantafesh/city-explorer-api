'use strict';

require('dotenv').config();
const express = require('express');
// const weatherData = require('./data/weather.json');
const cors = require('cors');
// const axios = require('axios');

const weatherHandler = require('./modules/weather.js');
const movieHandler = require('./modules/movies.js')

const server = express();
server.use(cors());

const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.log(`Listening to PORT ${PORT}`);
})

server.get('/weather', weatherHandler);

server.get('/movie', movieHandler);

server.get('*', (req, res) => {
    res.send('not found');
})
