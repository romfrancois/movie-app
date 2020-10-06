import React, { useEffect, useState } from "react";
import "./res/css/App.css";

import { Movie } from "./types/Movie";
import MovieComponent from "./components/Movie";

async function fetchData(url: string, param: string = "") {
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ query: param }),
    });
    const movies = await response.json();

    return movies.results;
}

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getMovies = async (url: string, param: string = "") => {
      const movies = await fetchData(url, param);
      setMovies(movies);
  };

  useEffect(() => {
      const URL = `/.netlify/functions/discover`;
      getMovies(URL);
  }, []);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
      const SEARCHAPI = `/.netlify/functions/search`;

      e.preventDefault();

      getMovies(`${SEARCHAPI}`, `${searchTerm}`);
      setSearchTerm("");
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      setSearchTerm(e.target.value);
  };

  return (
      <>
          <header>
              <form onSubmit={handleOnSubmit}>
                  <input
                      className="search"
                      type="search"
                      placeholder="Search"
                      value={searchTerm}
                      onChange={handleOnChange}
                  />
              </form>
          </header>
          <div className="movie-container">
              {movies?.map((movie: Movie) => (
                  <MovieComponent key={movie.id} {...movie} />
              ))}
          </div>
      </>
  );
}

export default App;
