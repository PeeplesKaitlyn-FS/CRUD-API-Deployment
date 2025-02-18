// server.js
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Movie = require('./models/Movie');

mongoose.connect('mongodb://localhost:27017/cinema-app/movies', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET /api/movies
app.get('/api/movies', (req, res) => {
  Movie.find().then((movies) => {
    res.json(movies);
  }).catch((err) => {
    res.status(500).json({ message: 'Error retrieving movies' });
  });
});

// POST /api/movies
app.post('/api/movies', (req, res) => {
  const movie = new Movie(req.body);
  movie.save().then((movie) => {
    res.json(movie);
  }).catch((err) => {
    res.status(400).json({ message: 'Error creating movie' });
  });
});

// GET /api/movies/:id
app.get('/api/movies/:id', (req, res) => {
  Movie.findById(req.params.id).then((movie) => {
    if (!movie) {
      res.status(404).json({ message: 'Movie not found' });
    } else {
      res.json(movie);
    }
  }).catch((err) => {
    res.status(500).json({ message: 'Error retrieving movie' });
  });
});

// PUT /api/movies/:id
app.put('/api/movies/:id', (req, res) => {
  Movie.findByIdAndUpdate(req.params.id, req.body, { new: true }).then((movie) => {
    res.json(movie);
  }).catch((err) => {
    res.status(400).json({ message: 'Error updating movie' });
  });
});

// DELETE /api/movies/:id
app.delete('/api/movies/:id', (req, res) => {
  Movie.findByIdAndRemove(req.params.id).then((movie) => {
    res.json({ message: 'Movie deleted successfully' });
  }).catch((err) => {
    res.status(404).json({ message: 'Movie not found' });
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});