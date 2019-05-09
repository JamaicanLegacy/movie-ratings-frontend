import * as types from "./actionTypes";
import * as directorApi from "../../api/directorApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadDirectorsSuccess(directors) {
  return { type: types.LOAD_DIRECTORS_SUCCESS, directors };
}

export function createDirectorSuccess(director) {
  return { type: types.CREATE_DIRECTOR_SUCCESS, director: director };
}

export function updateDirectorSuccess(director) {
  return { type: types.UPDATE_DIRECTOR_SUCCESS, director };
}

export function deleteDirectorOptimistic(director) {
  return { type: types.DELETE_DIRECTOR_OPTIMISTIC, director };
}

export function loadDirectors() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return directorApi
      .getDirectors()
      .then(directors => {
        dispatch(loadDirectorsSuccess(directors));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveDirector(director) {
  //eslint-disable-next-line no-unused-vars
  return function(dispatch, getState) {
    dispatch(beginApiCall());
    return directorApi
      .saveDirector(director)
      .then(savedDirector => {
        director.directorId
          ? dispatch(updateDirectorSuccess(savedDirector))
          : dispatch(createDirectorSuccess(savedDirector));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteDirector(director) {
  return function(dispatch) {
    dispatch(deleteDirectorOptimistic(director));
    return directorApi.deleteDirector(director.directorId);
  };
}
