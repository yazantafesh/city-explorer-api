'use strict';

require('dotenv').config();
const express = require('express');
const weatherData = require('./data/weather.json');
const cors = require('cors');

const server = express();
server.use(cors());

const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.log(`Listening to PORT ${PORT}`);
})

server.get('/weather', (req, res) => {
    let weatherNameData = req.query.city;
    let weatherLatData = req.query.lat;
    let weatherLonData = req.query.lon;

    let allWeatherData = weatherData.find(element => {
        if (weatherNameData == element.city_name.toLowerCase() && weatherLatData == element.lat && weatherLonData == element.lon) {
            error = true;
            return element;
        }
    })

    try {

        let forecastArray = [];
        let date;
        let description;
        let forecastData;

        for (let i = 0; i < allWeatherData.data.length; i++) {

            date = allWeatherData.data[i].valid_date;

            description = `Low of ${allWeatherData.data[i].min_temp}, high of ${allWeatherData.data[i].max_temp} with ${allWeatherData.data[i].weather.description}`;

            forecastData = new Forecast(date, description);

            forecastArray.push(forecastData);
        }

        res.send(forecastArray);

    } catch {
        res.send('Weather data for this city is not found');
    }
})

server.get('*', (req, res) => {
    res.send('not found');
})

class Forecast {
    constructor(date, description) {
        this.date = date;
        this.description = description;
    }


}