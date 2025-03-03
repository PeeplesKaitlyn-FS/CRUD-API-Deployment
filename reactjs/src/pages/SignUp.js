import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../App.css";
import authService from "../services/auth.service";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      await authService.signup(email, password).then(
        response => {
          
          navigate("/dashboard");
        },
        (error) => {
          console.log(error);
        }
      ) 
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>SignUp Page</h1>
        <Link to="/dashboard">Dashboard</Link>
      </header>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
