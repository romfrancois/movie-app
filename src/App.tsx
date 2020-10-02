import React, { useEffect, useState } from "react";
import "./res/css/App.css";

import { Movie } from './types/Movie';
import MovieComponent from "./components/Movie";

import { apikey } from "./res/apikey";

async function fetchData(url: string) {
  const response = await fetch(url);
  const movies = await response.json();

  return movies.results;
}

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getMovies = async (url: string) => {
    const movies = await fetchData(url);
    setMovies(movies);
  };

  useEffect(() => {
    const URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apikey}&page=1`;
    getMovies(URL);
  }, []);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    const SEARCHAPI = `https://api.themoviedb.org/3/search/movie?&api_key=${apikey}&query=`;

    e.preventDefault();

    getMovies(`${SEARCHAPI}${searchTerm}`);
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
