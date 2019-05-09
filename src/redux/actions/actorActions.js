import * as types from "./actionTypes";
import * as actorApi from "../../api/actorApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadActorsSuccess(actors) {
  return { type: types.LOAD_ACTORS_SUCCESS, actors };
}

export function createActorSuccess(actor) {
  return { type: types.CREATE_ACTOR_SUCCESS, actor: actor };
}

export function updateActorSuccess(actor) {
  return { type: types.UPDATE_ACTOR_SUCCESS, actor };
}

export function deleteActorOptimistic(actor) {
  return { type: types.DELETE_ACTOR_OPTIMISTIC, actor };
}

export function loadActors() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return actorApi
      .getActors()
      .then(actors => {
        dispatch(loadActorsSuccess(actors));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveActor(actor) {
  //eslint-disable-next-line no-unused-vars
  return function(dispatch, getState) {
    dispatch(beginApiCall());
    return actorApi
      .saveActor(actor)
      .then(savedActor => {
        savedActor.actorId
          ? dispatch(updateActorSuccess(savedActor))
          : dispatch(createActorSuccess(savedActor));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteActor(actor) {
  return function(dispatch) {
    dispatch(deleteActorOptimistic(actor));
    return actorApi.deleteActor(actor.actorId);
  };
}
