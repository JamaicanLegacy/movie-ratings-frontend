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

export function saveMovieDirectorsSuccess(movie) {
  return { type: types.SAVE_MOVIE_DIRECTORS_SUCCESS, movie };
}

export function saveMovieGenresSuccess(movie) {
  return { type: types.SAVE_MOVIE_GENRES_SUCCESS, movie };
}

export function saveMovieMediaHouseSuccess(movie) {
  return { type: types.SAVE_MOVIE_MEDIA_HOUSES_SUCCESS, movie };
}

export function updateMovieActors(actor, index) {
  return { type: types.UPDATE_MOVIE_ACTORS, actor, index };
}

export function updateMovieDirectors(director, index) {
  return { type: types.UPDATE_MOVIE_DIRECTORS, director, index };
}

export function updateMovieGenres(genre, index) {
  return { type: types.UPDATE_MOVIE_GENRES, genre, index };
}

export function updateMovieMediaHouses(mediaHouse, index) {
  return { type: types.UPDATE_MOVIE_MEDIA_HOUSES, mediaHouse, index };
}
export function addDummyActor(actor) {
  return { type: types.ADD_DUMMY_ACTOR, actor };
}

export function addDummyDirector(director) {
  return { type: types.ADD_DUMMY_DIRECTOR, director };
}

export function addDummyGenre(genre) {
  return { type: types.ADD_DUMMY_GENRE, genre };
}

export function addDummyMediaHouse(mediaHouse) {
  return { type: types.ADD_DUMMY_MEDIA_HOUSE, mediaHouse };
}

export function removeMovieDirector(director) {
  return { type: types.DELETE_MOVIE_DIRECTOR_SUCCESS, director };
}

export function removeMovieActor(actor) {
  return { type: types.DELETE_MOVIE_ACTOR_SUCCESS, actor };
}

export function removeMovieGenre(genre) {
  return { type: types.DELETE_MOVIE_GENRE_SUCCESS, genre };
}

export function removeMovieMediaHouse(mediaHouse) {
  return { type: types.DELETE_MOVIE_MEDIA_HOUSE_SUCCESS, mediaHouse };
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
      return movieApi
        .saveMovieActor(movie)
        .then(movieActor => {
          dispatch(saveMovieActorsSuccess(movieActor));
        })
        .catch(error => {
          dispatch(apiCallError(error));
          throw error;
        });
    };
  }
}

export function saveMovieDirector(movie) {
  if (movie.directors) {
    return function(dispatch) {
      dispatch(beginApiCall());
      return movieApi
        .saveMovieDirector(movie)
        .then(movieDirector => {
          dispatch(saveMovieDirectorsSuccess(movieDirector));
        })
        .catch(error => {
          dispatch(apiCallError(error));
          throw error;
        });
    };
  }
}

export function saveMovieGenre(movie) {
  if (movie.genres) {
    return function(dispatch) {
      dispatch(beginApiCall());
      return movieApi
        .saveMovieGenre(movie)
        .then(movieGenre => {
          dispatch(saveMovieGenresSuccess(movieGenre));
        })
        .catch(error => {
          dispatch(apiCallError(error));
          throw error;
        });
    };
  }
}

export function saveMovieMediaHouse(movie) {
  if (movie.mediaHouses) {
    return function(dispatch) {
      dispatch(beginApiCall());
      return movieApi
        .saveMovieMediaHouse(movie)
        .then(movieMediaHouse => {
          dispatch(saveMovieMediaHouseSuccess(movieMediaHouse));
        })
        .catch(error => {
          dispatch(apiCallError(error));
          throw error;
        });
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
export function updateDirectors(director, index) {
  return function(dispatch) {
    dispatch(updateMovieDirectors(director, index));
  };
}
export function updateGenres(genre, index) {
  return function(dispatch) {
    dispatch(updateMovieGenres(genre, index));
  };
}
export function updateMediaHouses(mediaHouse, index) {
  return function(dispatch) {
    dispatch(updateMovieMediaHouses(mediaHouse, index));
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
export function addDummyDirectors(director) {
  return function(dispatch) {
    dispatch(addDummyDirector(director));
  };
}

export function addDummyGenres(genre) {
  return function(dispatch) {
    dispatch(addDummyGenre(genre));
  };
}

export function addDummyMediaHouses(mediaHouse) {
  return function(dispatch) {
    dispatch(addDummyMediaHouse(mediaHouse));
  };
}

export function removeMovieDirectors(movieDirector) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return movieApi
      .deleteMovieDirector(movieDirector)
      .then(dispatch(removeMovieDirector(movieDirector)))
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function removeMovieActors(movieActor) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return movieApi
      .deleteMovieActor(movieActor)
      .then(dispatch(removeMovieActor(movieActor)))
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function removeMovieGenres(movieGenre) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return movieApi
      .deleteMovieGenre(movieGenre)
      .then(dispatch(removeMovieGenre(movieGenre)))
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function removeMovieMediaHouses(movieMediaHouse) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return movieApi
      .deleteMovieMediaHouse(movieMediaHouse)
      .then(dispatch(removeMovieMediaHouse(movieMediaHouse)))
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
