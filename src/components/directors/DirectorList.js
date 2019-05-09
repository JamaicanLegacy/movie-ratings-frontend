import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const DirectorList = ({ directors, onDeleteClick }) => (
  <table className="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Industry Start Date</th>
        <th>Retirment Date</th>
        <th>Active</th>
        <th>Gender</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {directors.map(director => {
        return (
          <tr key={director.directorId}>
            <td>
              <Link to={"/director/" + director.slug}>
                {director.firstName + " " + director.lastName}
              </Link>
            </td>
            <td>{director.industryStartDate}</td>
            <td>{director.retirementDate}</td>
            <td>{director.active ? "True" : "False"}</td>
            <td>{director.gender}</td>
            <td>
              <button
                className="btn btn-outline-danger"
                onClick={() => onDeleteClick(director)}
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
DirectorList.propTypes = {
  directors: PropTypes.array,
  onDeleteClick: PropTypes.func.isRequired
};

export default DirectorList;
