const express = require('express');
const router = express.Router();
const MovieListController = require('../controllers/MovieListController');
const MovieDetailsController = require('../controllers/MovieDetailsController');

router.get('/movies', MovieListController.getAllMovies);
router.post('/movies', MovieListController.createMovie);

router.get('/movies/:id', MovieDetailsController.getMovieById);
router.put('/movies/:id', MovieDetailsController.updateMovie);
router.delete('/movies/:id', MovieDetailsController.deleteMovie);

module.exports = router;