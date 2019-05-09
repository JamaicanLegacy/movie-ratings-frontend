import * as types from "./actionTypes";
import * as mediaHouseApi from "../../api/mediaHouseApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadMediaHousesSuccess(mediaHouses) {
  return { type: types.LOAD_MEDIA_HOUSES_SUCCESS, mediaHouses };
}

export function createMediaHouseSuccess(mediaHouse) {
  return { type: types.CREATE_MEDIA_HOUSE_SUCCESS, mediaHouse: mediaHouse };
}

export function updateMediaHouseSuccess(mediaHouse) {
  return { type: types.UPDATE_MEDIA_HOUSE_SUCCESS, mediaHouse };
}

export function deleteMediaHouseOptimistic(mediaHouse) {
  return { type: types.DELETE_MEDIA_HOUSE_OPTIMISTIC, mediaHouse };
}

export function loadMediaHouses() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return mediaHouseApi
      .getMediaHouses()
      .then(mediaHouses => {
        dispatch(loadMediaHousesSuccess(mediaHouses));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveMediaHouse(mediaHouse) {
  //eslint-disable-next-line no-unused-vars
  return function(dispatch, getState) {
    dispatch(beginApiCall());
    return mediaHouseApi
      .saveMediaHouse(mediaHouse)
      .then(savedMediaHouse => {
        savedMediaHouse.mediaHouseId
          ? dispatch(updateMediaHouseSuccess(savedMediaHouse))
          : dispatch(createMediaHouseSuccess(savedMediaHouse));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteMediaHouse(mediaHouse) {
  return function(dispatch) {
    dispatch(deleteMediaHouseOptimistic(mediaHouse));
    return mediaHouseApi.deleteMediaHouse(mediaHouse.mediaHouseId);
  };
}
