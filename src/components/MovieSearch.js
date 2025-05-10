import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieDetails from "./MovieDetails";
import WatchLaterList from "./WatchLaterList";
import "./styles/MovieSearch.css";

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [sortBy, setSortBy] = useState("Title");
  const [watchLater, setWatchLater] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${query}&apikey=597e4123&type=movie`
      );
      setMovies(response.data.Search || []);
    } catch (error) {
      console.error(error);
      setMovies([]);
    }
  };

  useEffect(() => {
    if (query) {
      handleSearch();
    } else {
      setMovies([]);
    }
  }, [query]);

  const handleSortBy = (e) => {
    const selectedSortBy = e.target.value;
    setSortBy(selectedSortBy);

    const sortedMovies = [...movies];
    sortedMovies.sort((a, b) => {
      if (selectedSortBy === "Title") {
        return a.Title.localeCompare(b.Title);
      } else if (selectedSortBy === "Year") {
        return parseInt(a.Year) - parseInt(b.Year);
      }
      return 0;
    });
    setMovies(sortedMovies);
  };

  const handleAddToWatchLater = (movie) => {
    setWatchLater((prevWatchLater) => [...prevWatchLater, movie]);
  };

  const handleRemoveFromWatchLater = (imdbID) => {
    setWatchLater((prevWatchLater) =>
      prevWatchLater.filter((movie) => movie.imdbID !== imdbID)
    );
  };

  return (
    <>
      <div className="header">
        <h2 className="fade-in-heading">Unicorn Movies</h2>
      </div>

      <div className="movie-search-container">
        <p id="desc">You can Search movies, Sort, Add to Watch Later! </p>
        <br />
        <div className="search-controls">
          <div className="search-container">
            <input
              className="search-input"
              type="text"
              placeholder="Search a movie like Batman"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="search-btn" onClick={handleSearch}>
              Search
            </button>
          </div>

          <div className="filters">
            <label>Sort by:</label>
            <select value={sortBy} onChange={handleSortBy}>
              <option value="Title">Title</option>
              <option value="Year">Year</option>
            </select>
          </div>
        </div>

        <WatchLaterList watchLater={watchLater} />

        <div className="movie-list">
          {movies.map((movie) => (
            <div key={movie.imdbID} className="movie-card">
              <MovieDetails movie={movie} />
              <button onClick={() => handleAddToWatchLater(movie)}>
                Add to Watch Later
              </button>
              {watchLater.some((item) => item.imdbID === movie.imdbID) ? (
                <button onClick={() => handleRemoveFromWatchLater(movie.imdbID)}>
                  Remove from Watch Later
                </button>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MovieSearch;
