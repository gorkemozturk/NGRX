import { Injectable } from '@angular/core';
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { LoadRooms, LoadRoomsFail, LoadRoomsSuccess, RoomActionTypes, SearchRooms, SearchRoomsFail, SearchRoomsSuccess } from "../actions/room.actions";
import { RoomService } from "../services/room.service";
import { catchError, debounceTime, map, mergeMap, tap } from "rxjs/operators";
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';

@Injectable()
export class RoomEffect {

    constructor(private actions$: Actions, private roomService: RoomService) {}

    loadRooms$: Observable<Action> = createEffect(() => {
        return this.actions$.pipe(
            ofType<LoadRooms>(RoomActionTypes.LOAD_ROOMS),
            mergeMap(() => this.roomService.getRooms().pipe(
                map(rooms => new LoadRoomsSuccess(rooms)),
                catchError(error => of(new LoadRoomsFail(error.message)))
            ))
        );
    });

    searchRooms$: Observable<Action> = createEffect(() => {
        return this.actions$.pipe(
            ofType<SearchRooms>(RoomActionTypes.SEARCH_ROOMS),
            debounceTime(750),
            mergeMap(action => this.roomService.searchRooms(action.keywords).pipe(
                map(rooms => new SearchRoomsSuccess(rooms)),
                catchError(error => of(new SearchRoomsFail(error.message)))
            ))
        );
    });
}