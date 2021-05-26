'use strict';

require('dotenv').config();
const express = require('express');
// const weatherData = require('./data/weather.json');
const cors = require('cors');
const axios = require('axios');

const server = express();
server.use(cors());

const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.log(`Listening to PORT ${PORT}`);
})

server.get('/weather', weatherHandler);

server.get('/movie', movieHandler)

function weatherHandler(req, res) {

    let weatherQuery = req.query.city;
    let key = process.env.WEATHER_API_KEY;
    // let weatherUrl = 'https://api.weatherbit.io/v2.0/forecast/daily?city=london&key=9342e4a8d5ae4e59aaf275f75ed61936'
    let weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${weatherQuery}&key=${key}`;

    axios
        .get(weatherUrl)
        .then(result => {
            const weatherArray = result.data.data.map(weatherItem => {
                return new Forecast(weatherItem);
            })
            res.send(weatherArray);
        })
        .catch(err => {

            res.status(500).send(`Weather data for this city is not found ${err}`);
        })
}

function movieHandler(req, res) {

    let movieQuery = req.query.city;
    let key = process.env.MOVIE_API_KEY;
    let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${movieQuery}`;
    // let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=506d0b8623be28cadfcac3e1d0be27b5&query=seattle`;

    axios
        .get(movieUrl)
        .then(result => {
            const movieArray = result.data.results.map(movieItem => {
                return new Movie(movieItem);
            })
            res.send(movieArray);
        })
        .catch(err => {

            res.status(500).send(`Movie data related to this city is not found ${err}`);
        })
}


server.get('*', (req, res) => {
    res.send('not found');
})

class Forecast {
    constructor(item) {
        this.date = item.valid_date;
        this.description = `Low of ${item.min_temp}, high of ${item.max_temp} with ${item.weather.description}`;
    }
}

class Movie {
    constructor(item) {
        this.title = item.original_title;
        this.overview = item.overview;
        this.average_votes = item.vote_average;
        this.total_votes = item.vote_count;
        this.image_url = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
        this.popularity = item.popularity;
        this.released_on = item.release_date;
        
    }
}