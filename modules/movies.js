const axios = require('axios');

module.exports = movieHandler;

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