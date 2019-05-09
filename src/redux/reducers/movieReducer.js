import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function movieReducer(state = initialState.movies, action) {
  switch (action.type) {
    case types.CREATE_MOVIE_SUCCESS:
      return [...state, { ...action.movie }];
    case types.UPDATE_MOVIE_SUCCESS:
      return state.map(movie =>
        movie.movieId === action.movie.movieId ? action.movie : movie
      );
    case types.LOAD_MOVIES_SUCCESS:
      return action.movies;
    case types.DELETE_MOVIE_OPTIMISTIC:
      return state.filter(movie => movie.movieId !== action.movie.movieId);
    default:
      return state;
  }
}
