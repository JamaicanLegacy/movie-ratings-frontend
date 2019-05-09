import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function mediaHouseReducer(
  state = initialState.mediaHouses,
  action
) {
  switch (action.type) {
    case types.CREATE_MEDIA_HOUSE_SUCCESS:
      return [...state, { ...action.mediaHouse }];
    case types.UPDATE_MEDIA_HOUSE_SUCCESS:
      return state.map(mediaHouse =>
        mediaHouse.mediaHouseId === action.mediaHouse.mediaHouseId
          ? action.mediaHouse
          : mediaHouse
      );
    case types.LOAD_MEDIA_HOUSES_SUCCESS:
      return action.mediaHouses;
    case types.DELETE_MEDIA_HOUSE_OPTIMISTIC:
      return state.filter(
        mediaHouse => mediaHouse.mediaHouseId !== action.mediaHouse.mediaHouseId
      );
    default:
      return state;
  }
}
