import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const MovieHome = ({ movies }) => (
  <div className="row">
    {movies.map(movie => {
      return (
        <div key={movie.movieId}>
          <div className="col-lg-3 col-md-3">
            <div className="thumbnail">
              <img
                src={movie.imgThumbnailUrl}
                alt={""}
                style={{ width: "200px", height: "280px" }}
              />
              <div className="cation">
                <h3 style={{ width: "200px" }}>
                  <a>{movie.title}</a>
                  {/* <Link
                    to={{
                      pathname: "/home/details/" + movie.movieId,
                      state: { movie: true }
                    }}
                  >
                    {movie.title}
                  </Link> */}
                  {/* <a asp-controller="Home" asp-action="Details" asp-route-id="@movie.MovieId"> </a> */}
                </h3>
                <div style={{ width: "200px" }}>{movie.releaseDate}</div>
              </div>
            </div>
          </div>
        </div>
      );
    })}
  </div>
);

MovieHome.propTypes = {
  movies: PropTypes.array
};

export default MovieHome;
