// Get the movie list element
const movieList = document.getElementById('movie-list');

// Make a GET request to the API to retrieve the movie list
fetch('http://localhost:3000/api/movies')
  .then(response => response.json())
  .then(data => {
    // Loop through the movie list and create a list item for each movie
    data.forEach(movie => {
      const movieElement = document.createElement('div');
      movieElement.classList.add('movie');

      const titleElement = document.createElement('h2');
      titleElement.classList.add('movie-title');
      titleElement.textContent = movie.title;
      movieElement.appendChild(titleElement);

      const directorElement = document.createElement('p');
      directorElement.classList.add('movie-director');
      directorElement.textContent = `Directed by: ${movie.director}`;
      movieElement.appendChild(directorElement);

      const releaseYearElement = document.createElement('p');
      releaseYearElement.classList.add('movie-release-year');
      releaseYearElement.textContent = `Release Year: ${movie.releaseYear}`;
      movieElement.appendChild(releaseYearElement);

      // Create a delete button for each movie
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => {
        // Make a DELETE request to the API to delete the movie
        fetch(`/api/movies/${movie._id}`, {
          method: 'DELETE',
        })
          .then(response => response.json())
          .then(data => console.log(data))
          .catch(error => console.error(error));

        // Remove the movie from the list
        movieElement.remove();
      });

      movieElement.appendChild(deleteButton);
      movieList.appendChild(movieElement);
    });
  })
  .catch(error => console.error(error));

  // Get the form element
const form = document.getElementById('movie-form');

// Add an event listener to the form to handle the submission
form.addEventListener('submit', (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the form data
  const title = document.getElementById('title').value;
  const director = document.getElementById('director').value;
  const releaseYear = document.getElementById('releaseYear').value;

 // Make a POST request to the API to create a new movie
fetch('http://localhost:3000/api/movies', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, director, releaseYear }),
  })
    .then(response => response.json())
    .then(data => {
      // Create a new movie element
      const movieElement = document.createElement('div');
      movieElement.classList.add('movie');

      const titleElement = document.createElement('h2');
      titleElement.classList.add('movie-title');
      titleElement.textContent = data.title;
      movieElement.appendChild(titleElement);

      const directorElement = document.createElement('p');
      directorElement.classList.add('movie-director');
      directorElement.textContent = `Directed by: ${data.director}`;
      movieElement.appendChild(directorElement);

      const releaseYearElement = document.createElement('p');
      releaseYearElement.classList.add('movie-release-year');
      releaseYearElement.textContent = `Release Year: ${data.releaseYear}`;
      movieElement.appendChild(releaseYearElement);

      // Create a delete button for the new movie
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => {
        // Make a DELETE request to the API to delete the movie
        fetch(`/api/movies/${data._id}`, {
          method: 'DELETE',
        })
          .then(response => response.json())
          .then(data => console.log(data))
          .catch(error => console.error(error));

        // Remove the movie from the list
        movieElement.remove();
      });

      movieElement.appendChild(deleteButton);
      movieList.appendChild(movieElement);
    })
    .catch(error => console.error(error));
});