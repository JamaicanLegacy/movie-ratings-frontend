import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function genreReducer(state = initialState.genres, action) {
  switch (action.type) {
    case types.CREATE_GENRE_SUCCESS:
      return [...state, { ...action.genre }];
    case types.UPDATE_GENRE_SUCCESS:
      return state.map(genre =>
        genre.genreId === action.genre.genreId ? action.genre : genre
      );
    case types.LOAD_GENRES_SUCCESS:
      return action.genres;
    case types.DELETE_GENRE_OPTIMISTIC:
      return state.filter(genre => genre.genreId !== action.genre.genreId);
    default:
      return state;
  }
}
