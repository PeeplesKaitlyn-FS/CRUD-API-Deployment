const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Movie = require('./movie.model');

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

app.get('/', (req, res) => {
  res.send('Movie Flix API');
});

app.listen(3001, () => {
  console.log('Server started on port 3001');
});

// GET /movies
app.get('/movies', (req, res) => {
    Movie.find().then(movies => {
      res.json(movies);
    }).catch(err => {
      res.status(500).json({ message: 'Error retrieving movies' });
    });
  });
  
  // GET /movies/:id
  app.get('/movies/:id', (req, res) => {
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
  
  // POST /movies
  app.post('/movies', (req, res) => {
    const movie = new Movie(req.body);
    movie.save().then(movie => {
      res.json(movie);
    }).catch(err => {
      res.status(400).json({ message: 'Error creating movie' });
    });
  });
  
  // PUT /movies/:id
  app.put('/movies/:id', (req, res) => {
    Movie.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(movie => {
      res.json(movie);
    }).catch(err => {
      res.status(400).json({ message: 'Error updating movie' });
    });
  });
  
  // DELETE /movies/:id
  app.delete('/movies/:id', (req, res) => {
    Movie.findByIdAndRemove(req.params.id).then(movie => {
      res.json({ message: 'Movie deleted successfully' });
    }).catch(err => {
      res.status(404).json({ message: 'Movie not found' });
    });
  });

  module.exports = app;