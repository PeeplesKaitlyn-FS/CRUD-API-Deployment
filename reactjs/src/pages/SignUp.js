import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import "../App.css";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (event) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log(data);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }

  return (
    <div className="App">
      <header className="App-header">
        <h1>SignUp Page</h1>
        <Link to="/dashboard">Dashboard</Link>

      </header>
    </div>
  );
}

export default SignUp;
