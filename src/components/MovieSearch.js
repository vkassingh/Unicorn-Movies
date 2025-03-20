import React, { useState } from "react";
import axios from "axios";
import MovieDetails from "./MovieDetails";
import WatchLaterList from "./WatchLaterList";
import "./styles/MovieSearch.css";

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("Title");
  const [watchLater, setWatchLater] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${query}&apikey=597e4123&page=${currentPage}&sort=${sortBy}`
      );
      setMovies(response.data.Search);
      setTotalPages(Math.ceil(response.data.totalResults / 10));
    } catch (error) {
      console.error(error);
      setMovies([]);
      setTotalPages(1);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    handleSearch();
  };

  const handleSortBy = (e) => {
    const selectedSortBy = e.target.value;
    setSortBy(selectedSortBy);
    setCurrentPage(1);

    // Clone the movies array before sorting to avoid mutating the original state
    const sortedMovies = [...movies];

    // Sort the movies array based on the selected sorting option
    sortedMovies.sort((a, b) => {
      if (selectedSortBy === "Title") {
        return a.Title.localeCompare(b.Title);
      } else if (selectedSortBy === "Year") {
        return parseInt(a.Year) - parseInt(b.Year);
      }
      return 0;
    });

    // Update the movies state with the sorted array
    setMovies([...sortedMovies]);
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
        <h2 className="fade-in-heading">🎬 MOVIEFLIX</h2>
      </div>
      <div className="movie-search-container">
        <div className="search-controls">
          <div className="search-container">
            <input
              className="search-input"
              type="text"
              placeholder="Search for a movie..."
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

        <div className="movie-list">
          {movies.map((movie) => (
            <div key={movie.imdbID} className="movie-card">
              <MovieDetails movie={movie} />
              <button onClick={() => handleAddToWatchLater(movie)}>
                Add to Watch Later
              </button>
              {watchLater.some((item) => item.imdbID === movie.imdbID) ? (
                <button
                  onClick={() => handleRemoveFromWatchLater(movie.imdbID)}
                >
                  Remove from Watch Later
                </button>
              ) : null}
            </div>
          ))}
        </div>

        <WatchLaterList watchLater={watchLater} />

        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button key={index + 1} onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default MovieSearch;
