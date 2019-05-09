import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  loadMovies,
  saveMovie,
  saveMovieActor,
  updateActors,
  addDummyActors
} from "../../redux/actions/movieActions";
import { loadActors } from "../../redux/actions/actorActions";
import PropTypes from "prop-types";
import MovieForm from "./MovieForm";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

function ManageMoviePage({
  movies,
  actors,
  loadActors,
  loadMovies,
  saveMovie,
  updateActors,
  addDummyActors,
  history,
  ...props
}) {
  const [movie, setMovie] = useState({ ...props.movie });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (movies.length === 0) {
      loadMovies().catch(error => {
        alert("Loading movies failed" + error);
      });
    } else {
      setMovie(movie);
    }
    if (actors.length === 0) {
      loadActors().catch(error => {
        alert("Loading actors failed" + error);
      });
    }
  }, [movie]);

  function handleChange(event, index = 0) {
    const { name, value } = event.target;
    if (name === "actorId" && value !== 0) {
      console.log("OnChange", name, value);
      //  action.actor.actorId
      updateActors({ [name]: parseInt(value, 10) }, index);
      // setMovie(prevMovie => ({
      //   ...prevMovie,
      //   actors: [...prevMovie.actors]
      // }));
      // console.log(movie);
    }
    /// TODO: Check Side effect in REDUX
    else
      setMovie(prevMovie => ({
        ...prevMovie,
        [name]: value
      }));
  }
  function formIsValid() {
    const { title, releaseDate, description, price } = movie;
    const errors = {};

    if (!title) errors.title = "Title is required";
    if (!description) errors.description = "Description is required";
    if (!releaseDate) errors.releaseDate = "Release date is required";
    if (!price) errors.price = "Price is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }
  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    if (movie.actors && movie.actors.length > 0) {
      saveMovieActor(movie);
    }
    saveMovie(movie)
      .then(() => {
        toast.success("Movie saved.");
        loadMovies().catch(error => {
          alert("Loading movies failed" + error);
        });
        history.push("/movies");
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }
  return movies.length === 0 || actors.length === 0 ? (
    <Spinner />
  ) : (
    <MovieForm
      movie={movie}
      errors={errors}
      actors={actors}
      movies={movies}
      onChange={handleChange}
      onUpdateActors={addDummyActors}
      onSave={handleSave}
      saving={saving}
    />
  );
}
//directors/genre/r needed
ManageMoviePage.propTypes = {
  movie: PropTypes.object.isRequired,
  actors: PropTypes.array.isRequired,
  movies: PropTypes.array.isRequired,
  loadMovies: PropTypes.func.isRequired,
  loadActors: PropTypes.func.isRequired,
  saveMovie: PropTypes.func.isRequired,
  updateActors: PropTypes.func.isRequired,
  addDummyActors: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export function getMovieBySlug(movies, slug) {
  return movies.find(movie => movie.slug === slug) || null;
}

//move
const newMovie = {
  title: "",
  releaseDate: "",
  price: 0.0,
  description: "",
  imgThumbnailUrl: ""
  // actors: []
};
//need to add actors
function mapStateToProps(
  state
  // , ownProps
) {
  // const slug = ownProps.match.params.slug;
  const movie =
    //  slug && state.movies.length > 0
    //  ? getMovieBySlug(state.movies, slug)
    state.movies.length > 0 && state.selectedMovie
      ? state.selectedMovie
      : newMovie;
  return { movie, movies: state.movies, actors: state.actors };
}

const mapDispatchToProps = {
  loadMovies,
  loadActors,
  saveMovie,
  updateActors,
  addDummyActors
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageMoviePage);
