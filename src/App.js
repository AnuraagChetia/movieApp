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
      const response = await fetch("https://swapi.dev/api/films/");
      if (!response.ok) {
        throw new Error("Something went wrong.");
      }
      const data = await response.json();
      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);
  const addMovieHandler = (movie) => {
    console.log(movie);
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
    content = <MoviesList movies={movies} />;
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
