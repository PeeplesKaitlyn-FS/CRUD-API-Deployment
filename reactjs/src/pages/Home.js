import { Link } from 'react-router-dom';

import '../App.css';

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie List Homepage</h1>
        <Link to="/dashboard">Dashboard</Link>
      </header>
    </div>
  );
}

export default Home;