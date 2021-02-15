import { BaseState } from ".";
import { RoomActions, RoomActionTypes } from "../actions/room.actions";
import { Room } from "../models/room.model";

export interface RoomState extends BaseState {
    rooms: Array<Room>
}
  
export const initialState: RoomState = {
    rooms: [],
    pending: false,
    loaded: false,
    error: undefined
}

export function RoomReducer(state = initialState, action: RoomActions): RoomState {
    switch (action.type) {
        case RoomActionTypes.LOAD_ROOMS:
            return  { ...state, pending: true, error: undefined };

        case RoomActionTypes.LOAD_ROOMS_SUCCESS:
            return  { ...state, pending: false, loaded: true, error: undefined, rooms: action.rooms };

        case RoomActionTypes.LOAD_ROOMS_FAIL:
            return  { ...state, pending: false, loaded: false, error: action.error };

        case RoomActionTypes.SEARCH_ROOMS:
            return  { ...state, pending: true, loaded: false, error: undefined };

        case RoomActionTypes.SEARCH_ROOMS_SUCCESS:
            return  { ...state, pending: false, loaded: true, error: undefined, rooms: action.rooms };

        case RoomActionTypes.SEARCH_ROOMS_FAIL:
            return  { ...state, pending: false, loaded: false, error: action.error };
    
        default:
            return state;
    }
}