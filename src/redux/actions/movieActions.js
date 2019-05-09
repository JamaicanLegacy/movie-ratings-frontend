import * as types from "./actionTypes";
import * as movieApi from "../../api/movieApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadMovieSuccess(movies) {
  return { type: types.LOAD_MOVIES_SUCCESS, movies };
}

export function createMovieSuccess(movie) {
  return { type: types.CREATE_MOVIE_SUCCESS, movie: movie };
}

export function updateMovieSuccess(movie) {
  return { type: types.UPDATE_MOVIE_SUCCESS, movie };
}

export function deletemovieOptimistic(movie) {
  return { type: types.DELETE_MOVIE_OPTIMISTIC, movie };
}

export function setMovie(slug, movies) {
  return { type: types.SELECTED_MOVIE, slug, movies };
}

export function resetMovie() {
  return { type: types.RESET_SELECTED_MOVIE };
}

export function saveMovieActorsSuccess(movie) {
  return { type: types.SAVE_MOVIE_ACTORS_SUCCESS, movie };
}

export function updateMovieActors(actor, index) {
  return { type: types.UPDATE_MOVIE_ACTORS_SUCCESS, actor, index };
}

export function addDummyActor(actor) {
  return { type: types.ADD_DUMMY_ACTOR, actor };
}

export function loadMovies() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return movieApi
      .getMovies()
      .then(movies => {
        dispatch(loadMovieSuccess(movies));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveMovieActor(movie) {
  if (movie.actors) {
    return function(dispatch) {
      dispatch(beginApiCall());
      return (
        movieApi
          .saveMovieActor(movie)
          // .then(dispatch(saveMovieActorsSuccess(movie)))
          .catch(error => {
            dispatch(apiCallError(error));
            throw error;
          })
      );
    };
  }
}

export function saveMovie(movie) {
  //eslint-disable-next-line no-unused-vars
  return function(dispatch, getState) {
    dispatch(beginApiCall());
    return movieApi
      .saveMovie(movie)
      .then(savedMovie => {
        movie.movieId
          ? dispatch(updateMovieSuccess(savedMovie))
          : dispatch(createMovieSuccess(savedMovie));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteMovie(movie) {
  return function(dispatch) {
    dispatch(deletemovieOptimistic(movie));
    return movieApi.deleteMovie(movie.movieId);
  };
}

export function selectMovie(slug) {
  return function(dispatch, getState) {
    dispatch(setMovie(slug, getState().movies));
  };
}
export function updateActors(actor, index) {
  return function(dispatch) {
    dispatch(updateMovieActors(actor, index));
  };
}
export function resetSelectedMovie() {
  return function(dispatch) {
    dispatch(resetMovie());
  };
}

export function addDummyActors(actor) {
  return function(dispatch) {
    dispatch(addDummyActor(actor));
  };
}
