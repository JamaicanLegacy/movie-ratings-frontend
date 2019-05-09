import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function directorReducer(
  state = initialState.directors,
  action
) {
  switch (action.type) {
    case types.CREATE_DIRECTOR_SUCCESS:
      return [...state, { ...action.director }];
    case types.UPDATE_DIRECTOR_SUCCESS:
      return state.map(director =>
        director.directorId === action.director.directorId
          ? action.director
          : director
      );
    case types.LOAD_DIRECTORS_SUCCESS:
      return action.directors;
    case types.DELETE_DIRECTOR_OPTIMISTIC:
      return state.filter(
        director => director.directorId !== action.director.directorId
      );
    default:
      return state;
  }
}
