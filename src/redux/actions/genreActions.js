import * as types from "./actionTypes";
import * as genreApi from "../../api/genreApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadGenresSuccess(genres) {
  return { type: types.LOAD_GENRES_SUCCESS, genres };
}

export function createGenreSuccess(genre) {
  return { type: types.CREATE_GENRE_SUCCESS, genre: genre };
}

export function updateGenreSuccess(genre) {
  return { type: types.UPDATE_GENRE_SUCCESS, genre };
}

export function deleteGenreOptimistic(genre) {
  return { type: types.DELETE_GENRE_OPTIMISTIC, genre };
}

export function loadGenres() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return genreApi
      .getGenres()
      .then(genres => {
        dispatch(loadGenresSuccess(genres));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveGenre(genre) {
  //eslint-disable-next-line no-unused-vars
  return function(dispatch, getState) {
    dispatch(beginApiCall());
    return genreApi
      .saveGenre(genre)
      .then(savedGenre => {
        savedGenre.genreId
          ? dispatch(updateGenreSuccess(savedGenre))
          : dispatch(createGenreSuccess(savedGenre));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteGenre(genre) {
  return function(dispatch) {
    dispatch(deleteGenreOptimistic(genre));
    return genreApi.deleteGenre(genre.genreId);
  };
}
