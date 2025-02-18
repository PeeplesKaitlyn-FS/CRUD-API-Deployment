const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Movie = require('../models/Movie');
const path = require('path');

mongoose.connect('mongodb://localhost:27017/cinema-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

console.log('Server started');

// API routes
app.get('/api/movies', (req, res) => {
  console.log('Received request for movies');
  Movie.find().then(movies => {
    console.log('Movies found:', movies);
    res.json(movies);
  }).catch(err => {
    console.error('Error retrieving movies:', err);
    res.status(500).json({ message: 'Error retrieving movies' });
  });
});

app.get('/api/movies/:id', (req, res) => {
  console.log('Received request for movie by id');
  Movie.findById(req.params.id).then(movie => {
    if (!movie) {
      console.log('Movie not found');
      res.status(404).json({ message: 'Movie not found' });
    } else {
      console.log('Movie found:', movie);
      res.json(movie);
    }
  }).catch(err => {
    console.error('Error retrieving movie:', err);
    res.status(500).json({ message: 'Error retrieving movie' });
  });
});

app.post('/api/movies', (req, res) => {
  console.log('Received request to create movie');
  const movie = new Movie(req.body);
  movie.save().then(movie => {
    console.log('Movie created:', movie);
    res.json(movie);
  }).catch(err => {
    console.error('Error creating movie:', err);
    res.status(400).json({ message: 'Error creating movie' });
  });
});

app.put('/api/movies/:id', (req, res) => {
  console.log('Received request to update movie');
  Movie.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(movie => {
    console.log('Movie updated:', movie);
    res.json(movie);
  }).catch(err => {
    console.error('Error updating movie:', err);
    res.status(400).json({ message: 'Error updating movie' });
  });
});

app.delete('/api/movies/:id', (req, res) => {
  console.log('Received request to delete movie');
  Movie.findByIdAndRemove(req.params.id).then(movie => {
    console.log('Movie deleted:', movie);
    res.json({ message: 'Movie deleted successfully' });
  }).catch(err => {
    console.error('Error deleting movie:', err);
    res.status(404).json({ message: 'Movie not found' });
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

module.exports = app;