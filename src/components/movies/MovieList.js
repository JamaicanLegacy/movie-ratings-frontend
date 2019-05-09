import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const MovieList = ({ movies, onDeleteClick, onSelectedMovieClick }) => (
  <table className="table">
    <thead>
      <tr>
        <th>Title</th>
        <th>Image</th>
        <th>Release Date</th>
        <th>Price</th>
        <th>Description</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {movies.map(movie => {
        return (
          <tr key={movie.movieId}>
            <td>
              <Link
                onClick={() => onSelectedMovieClick(movie.slug)}
                to={"/movie/" + movie.slug}
              >
                {movie.title}
              </Link>
            </td>
            <td>
              <img
                src={movie.imgThumbnailUrl}
                style={{ width: "200px", height: "280px" }}
              />
            </td>
            <td>{movie.releaseDate}</td>
            <td>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD"
              }).format(movie.price)}
            </td>
            <td>{movie.description}</td>
            <td>
              <button
                className="btn btn-outline-danger"
                onClick={() => onDeleteClick(movie)}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
//need to make required
MovieList.propTypes = {
  movies: PropTypes.array,
  onDeleteClick: PropTypes.func.isRequired,
  onSelectedMovieClick: PropTypes.func.isRequired
};

export default MovieList;
