const Movie = require('../models/Movie');

class MovieListController {
  static async getAllMovies(req, res) {
    try {
      const movies = await Movie.find();
      res.json(movies);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async createMovie(req, res) {
    try {
      const movie = new Movie(req.body);
      await movie.save();
      res.json(movie);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = MovieListController;