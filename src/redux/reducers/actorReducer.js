import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function actorReducer(state = initialState.actors, action) {
  switch (action.type) {
    case types.CREATE_ACTOR_SUCCESS:
      return [...state, { ...action.actor }];
    case types.UPDATE_ACTOR_SUCCESS:
      return state.map(actor =>
        actor.actorId === action.actor.actorId ? action.actor : actor
      );
    case types.LOAD_ACTORS_SUCCESS:
      return action.actors;
    case types.DELETE_ACTOR_OPTIMISTIC:
      return state.filter(actor => actor.actorId !== action.actor.actorId);
    default:
      return state;
  }
}
