import { combineReducers } from "redux";
import movies from "./movieReducer";
import actors from "./actorReducer";
import directors from "./directorReducer";
import genres from "./genreReducer";
import mediaHouses from "./mediaHouseReducer";
import apiCallsInProgress from "./apiStatusReducer";
import selectedMovie from "./selectedMovieReducer";

const rootReducer = combineReducers({
  movies,
  actors,
  directors,
  genres,
  mediaHouses,
  apiCallsInProgress,
  selectedMovie
});

export default rootReducer;
