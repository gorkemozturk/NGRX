import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RoomState } from "../reducers/room.reducer";

const featureSelector = createFeatureSelector<RoomState>('room');

export const GetRooms = createSelector(featureSelector, state => state.rooms);
export const GetRoomsPending = createSelector(featureSelector, state => state.pending);
export const GetRoomsLoaded = createSelector(featureSelector, state => state.loaded);
export const GetRoomsError = createSelector(featureSelector, state => state.error);