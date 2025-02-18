const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: String,
  director: String,
  releaseYear: Number,
  createdAt: Date
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;