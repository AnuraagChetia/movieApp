import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";

function App() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  //fetch moveis function
  const asyncFetchMovieHandler = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://movieapp-d6140-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong.");
      }
      const data = await response.json();
      let loadedMovies = [];
      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }
      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);
  //Add movies
  const addMovieHandler = async (movie) => {
    await fetch(
      "https://movieapp-d6140-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: { "Content-type": "application/JSON" },
      }
    );
    asyncFetchMovieHandler();
  };

  // load movies on page load
  useEffect(() => {
    asyncFetchMovieHandler();
  }, [asyncFetchMovieHandler]);

  //content to show in page
  let content = <p>No movie found.</p>;

  if (error) {
    content = <p>{error}</p>;
  }
  if (movies.length > 0) {
    content = <MoviesList movies={movies} fetch={asyncFetchMovieHandler} />;
  }
  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={asyncFetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
