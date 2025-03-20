import React from "react";
import "./styles/MovieDetails.css";

const MovieDetails = ({ movie }) => {
  return (
    <div className="container">
      <img className="movie-poster" src={movie.Poster} alt={movie.Title} />
      <div className="movie-title">{movie.Title}</div>
      <div className="movie-details">
        <p>Year: {movie.Year}</p>
        <p>Type: {movie.Type}</p>

        {/* Add more movie details as needed */}
      </div>
    </div>
  );
};

export default MovieDetails;
