import { Link } from 'react-router-dom';

import '../App.css';

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie List Homepage</h1>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Log In</Link>
      </header>
    </div>
  );
}

export default Home;