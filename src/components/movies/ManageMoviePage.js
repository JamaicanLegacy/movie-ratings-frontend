import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  loadMovies,
  saveMovie,
  addDummyActors,
  updateActors,
  saveMovieActor,
  removeMovieActors,
  addDummyDirectors,
  updateDirectors,
  saveMovieDirector,
  removeMovieDirectors,
  addDummyGenres,
  updateGenres,
  saveMovieGenre,
  removeMovieGenres,
  addDummyMediaHouses,
  updateMediaHouses,
  saveMovieMediaHouse,
  removeMovieMediaHouses
} from "../../redux/actions/movieActions";
import { loadActors } from "../../redux/actions/actorActions";
import { loadDirectors } from "../../redux/actions/directorActions";
import { loadGenres } from "../../redux/actions/genreActions";
import { loadMediaHouses } from "../../redux/actions/mediaHouseActions";
import PropTypes from "prop-types";
import MovieForm from "./MovieForm";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
function ManageMoviePage({
  movies,
  actors,
  directors,
  genres,
  mediaHouses,
  loadActors,
  loadDirectors,
  loadGenres,
  loadMediaHouses,
  loadMovies,
  saveMovie,
  addDummyActors,
  updateActors,
  saveMovieActor,
  removeMovieActors,
  addDummyDirectors,
  updateDirectors,
  saveMovieDirector,
  removeMovieDirectors,
  addDummyGenres,
  updateGenres,
  removeMovieGenres,
  saveMovieGenre,
  addDummyMediaHouses,
  updateMediaHouses,
  saveMovieMediaHouse,
  removeMovieMediaHouses,
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
    if (directors.length === 0) {
      loadDirectors().catch(error => {
        alert("Loading directors failed" + error);
      });
    }
    if (genres.length === 0) {
      loadGenres().catch(error => {
        alert("Loading genres failed" + error);
      });
    }
    if (mediaHouses.length === 0) {
      loadMediaHouses().catch(error => {
        alert("Loading media Houses failed" + error);
      });
    }
  }, [movie]);

  function handleChange(event, index = 0) {
    const { name, value } = event.target;
    if (name === "actorId" && value !== 0) {
      updateActors({ [name]: parseInt(value, 10) }, index);
    } else if (name === "directorId" && value !== 0) {
      updateDirectors({ [name]: parseInt(value, 10) }, index);
    } else if (name === "genreId" && value !== 0) {
      updateGenres({ [name]: parseInt(value, 10) }, index);
    } else if (name === "mediaHouseId" && value !== 0) {
      updateMediaHouses({ [name]: parseInt(value, 10) }, index);
    } else
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
    newMovie.movieId = props.movie.movieId;
    if (props.movie.actors && props.movie.actors.length > 0) {
      newMovie.actors = props.movie.actors.filter(
        act1 =>
          !movie.actors.some(
            act2 => act2.actorId === act1.actorId && act1.movieId != null
          )
      );
      if (newMovie.actors.length > 0) {
        saveMovieActor(newMovie);
      }
    }
    if (props.movie.directors && props.movie.directors.length > 0) {
      newMovie.directors = props.movie.directors.filter(
        dir1 =>
          !movie.directors.some(
            dir2 => dir2.directorId === dir1.directorId && dir1.movieId != null
          )
      );
      if (newMovie.directors.length > 0) {
        saveMovieDirector(newMovie);
      }
    }
    if (props.movie.genres && props.movie.genres.length > 0) {
      newMovie.genres = props.movie.genres.filter(
        gen1 =>
          !movie.genres.some(
            gen2 => gen2.genreId === gen1.genreId && gen1.movieId != null
          )
      );
      if (newMovie.genres.length > 0) {
        saveMovieGenre(newMovie);
      }
    }
    if (props.movie.mediaHouses && props.movie.mediaHouses.length > 0) {
      newMovie.mediaHouses = props.movie.mediaHouses.filter(
        mh1 =>
          !movie.mediaHouses.some(
            mh2 => mh2.mediaHouseId === mh1.mediaHouseId && mh1.movieId !== null
          )
      );
      if (newMovie.mediaHouses.length > 0) {
        saveMovieMediaHouse(newMovie);
      }
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
      directors={directors}
      mediaHouses={mediaHouses}
      genres={genres}
      movies={movies}
      onChange={handleChange}
      onUpdateActors={addDummyActors}
      onDeleteActor={removeMovieActors}
      onUpdateDirectors={addDummyDirectors}
      onDeleteDirector={removeMovieDirectors}
      onUpdateGenres={addDummyGenres}
      onDeleteGenre={removeMovieGenres}
      onUpdateMediaHouses={addDummyMediaHouses}
      onDeleteMediaHouse={removeMovieMediaHouses}
      onSave={handleSave}
      saving={saving}
    />
  );
}
//directors/genre/r needed
ManageMoviePage.propTypes = {
  movie: PropTypes.object.isRequired,
  actors: PropTypes.array.isRequired,
  genres: PropTypes.array.isRequired,
  directors: PropTypes.array.isRequired,
  movies: PropTypes.array.isRequired,
  mediaHouses: PropTypes.array.isRequired,
  loadMovies: PropTypes.func.isRequired,
  loadDirectors: PropTypes.func.isRequired,
  loadActors: PropTypes.func.isRequired,
  loadGenres: PropTypes.func.isRequired,
  loadMediaHouses: PropTypes.func.isRequired,
  saveMovie: PropTypes.func.isRequired,
  updateActors: PropTypes.func.isRequired,
  updateDirectors: PropTypes.func.isRequired,
  updateGenres: PropTypes.func.isRequired,
  updateMediaHouses: PropTypes.func.isRequired,
  saveMovieActor: PropTypes.func.isRequired,
  saveMovieDirector: PropTypes.func.isRequired,
  saveMovieGenre: PropTypes.func.isRequired,
  saveMovieMediaHouse: PropTypes.func.isRequired,
  addDummyActors: PropTypes.func.isRequired,
  addDummyGenres: PropTypes.func.isRequired,
  addDummyDirectors: PropTypes.func.isRequired,
  addDummyMediaHouses: PropTypes.func.isRequired,
  removeMovieDirectors: PropTypes.func.isRequired,
  removeMovieActors: PropTypes.func.isRequired,
  removeMovieGenres: PropTypes.func.isRequired,
  removeMovieMediaHouses: PropTypes.func.isRequired,
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
function mapStateToProps(state) {
  const movie =
    state.movies.length > 0 && state.selectedMovie.title
      ? state.selectedMovie
      : newMovie;
  return {
    movie,
    movies: state.movies,
    actors: state.actors,
    directors: state.directors,
    genres: state.genres,
    mediaHouses: state.mediaHouses
  };
}

const mapDispatchToProps = {
  loadMovies,
  loadActors,
  loadDirectors,
  loadGenres,
  loadMediaHouses,
  saveMovie,
  addDummyActors,
  updateActors,
  saveMovieActor,
  removeMovieActors,
  addDummyDirectors,
  updateDirectors,
  saveMovieDirector,
  removeMovieDirectors,
  addDummyGenres,
  updateGenres,
  saveMovieGenre,
  removeMovieGenres,
  addDummyMediaHouses,
  updateMediaHouses,
  saveMovieMediaHouse,
  removeMovieMediaHouses
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageMoviePage);
