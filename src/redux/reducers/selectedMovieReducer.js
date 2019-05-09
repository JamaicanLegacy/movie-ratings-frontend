import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function selectMovieReducer(
  state = initialState.selectedMovie,
  action
) {
  switch (action.type) {
    case types.SELECTED_MOVIE: {
      state =
        action.movies.length > 0
          ? action.movies.find(movie => movie.slug === action.slug)
          : null;
      return state;
    }
    case types.RESET_SELECTED_MOVIE:
      return {};
    case types.SAVE_MOVIE_ACTORS_SUCCESS:
      break;
    case types.UPDATE_MOVIE_ACTORS_SUCCESS:
      //debugger;
      console.log("state.actors", state.actors);
      if (state.actors.length > 0) {
        let index;
        for (index = 0; index < state.actors.length; index++) {
          console.log("Index", index, "Acton Index", action.index);
          console.log("LOOP", state.actors[index]);
          if (action.index === index) {
            let actors = [...state.actors];
            console.log("state before", state.actors[index]);
            actors[index] = action.actor;
            console.log("state after", state.actors[index]);
            state = { ...state, actors: [...actors] };
            return state;
          }
        }
      } else {
        console.log("list empty", state);
        state = {
          ...state,
          actors: [...state.actors, { ...action.actor }]
        };
        console.log("REDUCER CALLED", state);
        return state;
      }
      break;
    case types.ADD_DUMMY_ACTOR:
      return {
        ...state,
        actors: [...state.actors, { ...action.actor }]
      };
    default:
      return state;
  }
}
