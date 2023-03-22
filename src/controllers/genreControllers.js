const { Genre } = require('../db');
const axios = require('axios');
const { API_KEY } = process.env;

const allGenres = async() => {
    try {
        const genresDb = await Genre.findAll();
        if(!genresDb.length) {
            const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
            const genres = await genresApi.data.results.map(e => e.name)
        
            genres.forEach(async(e) => await Genre.findOrCreate({
                where: { name: e }
            }));
            return genres
        }
        else {
            return genresDb.map(e => e.name)
        }
    } catch (err) {
        console.log(err)
    }
}


module.exports = { allGenres }

