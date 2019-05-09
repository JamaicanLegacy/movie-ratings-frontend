import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const MediaHouseList = ({ mediaHouses, onDeleteClick }) => (
  <table className="table">
    <thead>
      <tr>
        <th>Name</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {mediaHouses.map(mediaHouse => {
        return (
          <tr key={mediaHouse.mediaHouseId}>
            <td>
              <Link to={"/mediaHouse/" + mediaHouse.slug}>
                {mediaHouse.name}
              </Link>
            </td>
            <td>
              <button
                className="btn btn-outline-danger"
                onClick={() => onDeleteClick(mediaHouse)}
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
MediaHouseList.propTypes = {
  mediaHouses: PropTypes.array,
  onDeleteClick: PropTypes.func.isRequired
};

export default MediaHouseList;
