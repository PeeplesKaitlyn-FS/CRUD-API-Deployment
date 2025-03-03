import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../App.css";
import authService from "../services/auth.service";


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (event
    ) => {
    event.preventDefault();
    try {
        await authService.login(email, password).then(
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
        <h1>Login Page</h1>
        <Link to="/dashboard">Dashboard</Link>
      </header>
      <section>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
        </section>
    </div>
  );
}

export default Login;
