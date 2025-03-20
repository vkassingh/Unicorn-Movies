import React from "react";
import "./styles/WatchLaterList.css";

const WatchLaterList = ({ watchLater }) => {
  return (
    <div className="watch-later-list">
      <h2> 🎦 Watch Later List</h2>

      {watchLater.length === 0 ? (
        <p>No movies added to watch later list.</p>
      ) : (
        <ul>
          {watchLater.map((movie) => (
            <li key={movie.imdbID}>{movie.Title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WatchLaterList;
