import { Action } from "@ngrx/store";
import { Room } from "../models/room.model";

export enum RoomActionTypes {
    LOAD_ROOMS           = '[Room] Load Rooms',
    LOAD_ROOMS_SUCCESS   = '[Room] Load Rooms Success',
    LOAD_ROOMS_FAIL      = '[Room] Load Rooms Fail',

    SEARCH_ROOMS         = '[Room] Search Rooms',
    SEARCH_ROOMS_SUCCESS = '[Room] Search Rooms Success',
    SEARCH_ROOMS_FAIL    = '[Room] Search Rooms Fail'
}

export class LoadRooms implements Action {
    readonly type = RoomActionTypes.LOAD_ROOMS;
}

export class LoadRoomsSuccess implements Action {
    readonly type = RoomActionTypes.LOAD_ROOMS_SUCCESS;

    constructor(public rooms: Array<Room>) {}
}

export class LoadRoomsFail implements Action {
    readonly type = RoomActionTypes.LOAD_ROOMS_FAIL;

    constructor(public error: string) {}
}

export class SearchRooms implements Action {
    readonly type = RoomActionTypes.SEARCH_ROOMS;

    constructor(public keywords: Array<any>) {}
}

export class SearchRoomsSuccess implements Action {
    readonly type = RoomActionTypes.SEARCH_ROOMS_SUCCESS;

    constructor(public rooms: Array<Room>) {}
}

export class SearchRoomsFail implements Action {
    readonly type = RoomActionTypes.SEARCH_ROOMS_FAIL;

    constructor(public error: string) {}
}

export type RoomActions = 
    LoadRooms | 
    LoadRoomsSuccess | 
    LoadRoomsFail |
    SearchRooms | 
    SearchRoomsSuccess | 
    SearchRoomsFail;