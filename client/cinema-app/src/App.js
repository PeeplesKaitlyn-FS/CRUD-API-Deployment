import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './App.css';

function App() {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowShowingMovies, setNowShowingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/movies')
      .then(response => response.json())
      .then(data => {
        const upcoming = data.filter(movie => movie.releaseYear > new Date().getFullYear());
        const nowShowing = data.filter(movie => movie.releaseYear <= new Date().getFullYear());
        setUpcomingMovies(upcoming);
        setNowShowingMovies(nowShowing);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Movie Flix</h1>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/movies">Movies</Link></li>
            </ul>
          </nav>
        </header>
        <Switch>
          <Route path="/" exact>
            <section>
              <h2>Upcoming Movies</h2>
              <ul>
                {upcomingMovies.map(movie => (
                  <li key={movie._id}>
                    <h3>{movie.title}</h3>
                    <p>Director: {movie.director}</p>
                    <p>Release Year: {movie.releaseYear}</p>
                  </li>
                ))}
              </ul>
            </section>
          </Route>
          <Route path="/movies">
            <section>
              <h2>Now Showing</h2>
              <ul>
                {nowShowingMovies.map(movie => (
                  <li key={movie._id}>
                    <h3>{movie.title}</h3>
                    <p>Director: {movie.director}</p>
                    <p>Release Year: {movie.releaseYear}</p>
                  </li>
                ))}
              </ul>
            </section>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;