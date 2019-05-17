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
      return state;
    case types.UPDATE_MOVIE_ACTORS:
      if (state.actors.length > 0) {
        let index;
        for (index = 0; index < state.actors.length; index++) {
          if (action.index === index) {
            let actors = [...state.actors];
            actors[index] = action.actor;
            state = { ...state, actors: [...actors] };
            return state;
          }
        }
      } else {
        state = {
          ...state,
          actors: [...state.actors, { ...action.actor }]
        };
        return state;
      }
      break;
    case types.SAVE_MOVIE_DIRECTORS_SUCCESS:
      return state;
    case types.UPDATE_MOVIE_DIRECTORS:
      if (state.directors.length > 0) {
        let index;
        for (index = 0; index < state.directors.length; index++) {
          if (action.index === index) {
            let directors = [...state.directors];
            directors[index] = action.director;
            state = { ...state, directors: [...directors] };
            return state;
          }
        }
      } else {
        state = {
          ...state,
          directors: [...state.directors, { ...action.directors }]
        };
        return state;
      }
      break;
    case types.SAVE_MOVIE_GENRES_SUCCESS:
      return state;
    case types.UPDATE_MOVIE_GENRES:
      if (state.genres.length > 0) {
        let index;
        for (index = 0; index < state.genres.length; index++) {
          if (action.index === index) {
            let genres = [...state.genres];
            genres[index] = action.genre;
            state = { ...state, genres: [...genres] };
            return state;
          }
        }
      } else {
        state = {
          ...state,
          genres: [...state.genres, { ...action.genres }]
        };
        return state;
      }
      break;
    case types.SAVE_MOVIE_MEDIA_HOUSES_SUCCESS:
      return state;
    case types.UPDATE_MOVIE_MEDIA_HOUSES:
      if (state.mediaHouses.length > 0) {
        let index;
        for (index = 0; index < state.mediaHouses.length; index++) {
          if (action.index === index) {
            let mediaHouses = [...state.mediaHouses];
            mediaHouses[index] = action.mediaHouse;
            state = { ...state, mediaHouses: [...mediaHouses] };
            return state;
          }
        }
      } else {
        state = {
          ...state,
          mediaHouses: [...state.mediaHouses, { ...action.mediaHouses }]
        };
        return state;
      }
      break;
    case types.ADD_DUMMY_ACTOR:
      return {
        ...state,
        actors: [...state.actors, { ...action.actor }]
      };
    case types.ADD_DUMMY_DIRECTOR:
      return {
        ...state,
        directors: [...state.directors, { ...action.director }]
      };
    case types.ADD_DUMMY_GENRE:
      return {
        ...state,
        genres: [...state.genres, { ...action.genre }]
      };
    case types.ADD_DUMMY_MEDIA_HOUSE:
      return {
        ...state,
        mediaHouses: [...state.mediaHouses, { ...action.mediaHouse }]
      };
    case types.DELETE_MOVIE_DIRECTOR_SUCCESS: {
      return {
        ...state,
        directors: [
          ...state.directors.filter(
            director => director.directorId !== action.director.directorId
          )
        ]
      };
    }
    case types.DELETE_MOVIE_ACTOR_SUCCESS: {
      return {
        ...state,
        actors: [
          ...state.actors.filter(
            actor => actor.actorId !== action.actor.actorId
          )
        ]
      };
    }
    case types.DELETE_MOVIE_GENRE_SUCCESS: {
      return {
        ...state,
        genres: [
          ...state.genres.filter(
            genre => genre.genreId !== action.genre.genreId
          )
        ]
      };
    }
    case types.DELETE_MOVIE_MEDIA_HOUSE_SUCCESS: {
      return {
        ...state,
        mediaHouses: [
          ...state.mediaHouses.filter(
            mediaHouse =>
              mediaHouse.mediaHouseId !== action.mediaHouse.mediaHouseId
          )
        ]
      };
    }
    default:
      return state;
  }
}
