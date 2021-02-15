import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoadRooms, SearchRooms } from 'src/app/actions/room.actions';
import { Room } from 'src/app/models/room.model';
import { State } from 'src/app/reducers';
import * as selector from 'src/app/selectors/room.selector';

@Component({
  selector: 'app-list',
  template: `
    <div *ngIf="(error$ | async)">{{error$ | async}}</div>

    <table border="1">
      <thead>
        <tr>
          <th *ngFor="let column of columns" align="left">
            {{column}}
          </th>
        </tr>

        <tr>
          <th *ngFor="let column of columns" align="left">
            <input type="text" name="{{toCamelCase(column)}}" (input)="search($event.target)" placeholder="Search" />
          </th>
        </tr>
      </thead>

      <tbody>
        <tr *ngIf="(pending$ | async)">
          <td colspan="3" align="center">
            <small>Resources are currently pending.</small>
          </td>
        </tr>

        <tr *ngIf="!(pending$ | async) && !(rooms$ | async).length">
          <td colspan="3" align="center">
            <small>No resource found.</small>
          </td>
        </tr>
        
        <tr *ngFor="let room of rooms$ | async">
          <td>{{room.name}}</td>
          <td>{{room.rate | currency}}</td>
          <td>{{room.createdAt}}</td>
        </tr>
      </tbody>
    </table>

    <small *ngIf="(loaded$ | async)">Room resources have been loaded successfully.</small>
  `,
  styleUrls: ['./list.component.css']
})
export class IndexComponent implements OnInit {
  rooms$: Observable<Array<Room>>;
  pending$: Observable<boolean>;
  loaded$: Observable<boolean>;
  error$: Observable<string>;

  columns: Array<any> = ['Name', 'Rate', 'Created At'];

  terms = [];

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.store.dispatch(new LoadRooms());

    const rooms = this.store.pipe(select(selector.GetRooms));

    this.pending$ = this.store.pipe(select(selector.GetRoomsPending));
    this.loaded$ = this.store.pipe(select(selector.GetRoomsLoaded));
    this.error$ = this.store.pipe(select(selector.GetRoomsError));
    this.rooms$ = rooms.pipe(map((result: any) => result.value));
  }

  search(target: any): void {
    let prop = target.name;
    let term = this.terms.find(t => t.prop === prop);

    if (term) {
      this.terms = this.terms.filter(t => t != term);
      this.terms.push({prop: prop, value: target.value});
    }
    else {
      this.terms.push({prop: prop, value: target.value});
    }

    this.store.dispatch(new SearchRooms(this.terms));
  }

  toCamelCase(text: string): string {
    return text.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
  }
}