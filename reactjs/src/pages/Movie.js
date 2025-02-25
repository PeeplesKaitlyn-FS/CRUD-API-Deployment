import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';

import '../App.css';

function Movie() {
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [values, setValues] = useState({
    title: '',
    director: '',
    release_date: '',
    genre: ''
  })

  const { id } = useParams()
  const navigate = useNavigate();


  const API_BASE = process.env.NODE_ENV === 'development'
    ? `http://localhost:8000/api/v1`
    : process.env.REACT_APP_BASE_URL;

    let ignore = false;
    useEffect(() => {
      

      if(!ignore){
        getMovie();
      }

      return () => {
        ignore = true;
      }
    }, [])

    const getMovie = async () => {
      setLoading(true)
      try {
        await fetch(`${API_BASE}/movies/${id}`)
                  .then(res => res.json())
                  .then(data => {
                    console.log({data})
                    // const { name, class } = data;
                    setValues({
                        title: data.title,
                        director: data.director,
                        release_date: data.release_date,
                        genre: data.genre
                    })
                  })
      } catch(error) {
        setError(error.message || "Unexpected Error")
      } finally {
        setLoading(false)
      }
    }

    const deleteMovie = async () => {
        try {
            await fetch(`${API_BASE}/movies/${id}`, {
                method: 'DELETE'
            })
                      .then(res => res.json())
                      .then(data => {
                        setMovie(data)
                        navigate("/dashboard", { replace: true })
                      })
          } catch(error) {
            setError(error.message || "Unexpected Error")
          } finally {
            setLoading(false)
          }
    }

    const updateMovie = async () => {
        try {
            await fetch(`${API_BASE}/movies/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
                      .then(res => res.json())
                      .then(data => {
                        console.log({data})
                      })
          } catch(error) {
            setError(error.message || "Unexpected Error")
          } finally {
            setLoading(false)
          }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        updateMovie();
    }

    const handleInputChanges = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            [event.target.name]: event.target.value
        }))
    }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Profile</h1>
        <h5>{values && values.title}</h5>
        <p>Director: {values && values.director}</p>
        <p>Release Date: {values && values.release_date}</p>
        <p>Genre: {values && values.genre}</p>
        <button onClick={() => deleteMovie()}>Delete Movie</button>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>

        <form onSubmit={(event) => handleSubmit(event)}>
            <label>
                Title:
                <input type="text" name="title" value={values.title} onChange={handleInputChanges} />
            </label>
            <label>
                Director:
                <input type="text" name="director" value={values.director} onChange={handleInputChanges} />
            </label>
            <label>
                Release Date:
                <input type="text" name="release_date" value={values.release_date} onChange={handleInputChanges} />
            </label>
            <label>
                Genre:
                <input type="text" name="genre" value={values.genre} onChange={handleInputChanges} />
            </label>
            <input type="submit" value="Submit" />
        </form>

      </header>
    </div>
  );
}

export default Movie;