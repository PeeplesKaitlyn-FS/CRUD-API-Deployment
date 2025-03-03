import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Movie from './pages/Movie'
import SignUp from './pages/SignUp'
import Login from './pages/Login'

function App() {
  const [currentUser, setCurrentUser] = useState(false);

  useEffect(() => {
    const user = false;
    if (user) {
      setCurrentUser(user);
    }
  }, []);
    
  return (
   <div>
    <h1>Movie List</h1>
    <div>
      {
      currentUser === false
      ? <h2>Logged In</h2>
      : <h2>Not Logged In</h2>
    }
    </div>
    <section>
      <Routes>
        <Route path="/signup" exact element={<SignUp />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/movies/:id" exact element={<Movie />} />
        <Route path="/dashboard" exact element={<Dashboard />} />
        <Route path="/" exact element={<Home />} />
      </Routes>
    </section>
   </div>
  );
}

export default App;