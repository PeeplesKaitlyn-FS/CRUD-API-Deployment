import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Flix</h1>
        <nav>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Movies</a></li>
            <li><a href="#">About</a></li>
          </ul>
        </nav>
      </header>
      <main>
        <section>
          <h2>Upcoming Movies</h2>
          {/* Display upcoming movies here */}
        </section>
        <section>
          <h2>Now Showing</h2>
          {/* Display now showing movies here */}
        </section>
      </main>
    </div>
  );
}

export default App;