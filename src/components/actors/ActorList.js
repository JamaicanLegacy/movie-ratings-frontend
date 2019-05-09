import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ActorList = ({ actors, onDeleteClick }) => (
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
      {actors.map(actor => {
        return (
          <tr key={actor.actorId}>
            <td>
              <Link to={"/actor/" + actor.slug}>
                {actor.firstName + " " + actor.lastName}
              </Link>
            </td>
            <td>{actor.industryStartDate}</td>
            <td>{actor.retirementDate}</td>
            <td>{actor.active ? "True" : "False"}</td>
            <td>{actor.gender}</td>
            <td>
              <button
                className="btn btn-outline-danger"
                onClick={() => onDeleteClick(actor)}
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
ActorList.propTypes = {
  actors: PropTypes.array,
  onDeleteClick: PropTypes.func.isRequired
};

export default ActorList;
