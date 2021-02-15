import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { RoomReducer, RoomState } from './room.reducer';

export interface BaseState {
  pending: boolean,
  loaded: boolean,
  error: string
}

export interface State {
  room: RoomState
}

export const Reducers: ActionReducerMap<State> = {
  room: RoomReducer
};