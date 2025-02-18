const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: String,
  director: String,
  releaseDate: Date,
  rating: Number
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;