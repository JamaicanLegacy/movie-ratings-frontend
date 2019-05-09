import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const GenreList = ({ genres, onDeleteClick }) => (
  <table className="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {genres.map(genre => {
        return (
          <tr key={genre.genreId}>
            <td>
              <Link to={"/genre/" + genre.slug}>{genre.name}</Link>
            </td>
            <td>{genre.description}</td>
            <td>
              <button
                className="btn btn-outline-danger"
                onClick={() => onDeleteClick(genre)}
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
GenreList.propTypes = {
  genres: PropTypes.array,
  onDeleteClick: PropTypes.func.isRequired
};

export default GenreList;
