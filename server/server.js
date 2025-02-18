const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Movie = require('./models/Movie');
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

// Serve the React app's static files
app.use(express.static(path.join(__dirname, '../client/cinema-app/build')));

// API routes
app.get('/api/movies', (req, res) => {
  Movie.find().then(movies => {
    res.json(movies);
  }).catch(err => {
    res.status(500).json({ message: 'Error retrieving movies' });
  });
});

app.get('/api/movies/:id', (req, res) => {
  Movie.findById(req.params.id).then(movie => {
    if (!movie) {
      res.status(404).json({ message: 'Movie not found' });
    } else {
      res.json(movie);
    }
  }).catch(err => {
    res.status(500).json({ message: 'Error retrieving movie' });
  });
});

app.post('/api/movies', (req, res) => {
  const movie = new Movie(req.body);
  movie.save().then(movie => {
    res.json(movie);
  }).catch(err => {
    res.status(400).json({ message: 'Error creating movie' });
  });
});

app.put('/api/movies/:id', (req, res) => {
  Movie.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(movie => {
    res.json(movie);
  }).catch(err => {
    res.status(400).json({ message: 'Error updating movie' });
  });
});

app.delete('/api/movies/:id', (req, res) => {
  Movie.findByIdAndRemove(req.params.id).then(movie => {
    res.json({ message: 'Movie deleted successfully' });
  }).catch(err => {
    res.status(404).json({ message: 'Movie not found' });
  });
});

// Serve the React app's index.html file for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/cinema-app/build/index.html'));
});

// Serve the React app's index.html file for any unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/cinema-app/build/index.html'));
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

module.exports = app;