import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../models/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private url = "https://localhost:44344/api/rooms";

  constructor(private http: HttpClient) { }

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.url);
  }

  getRoom(id: number): Observable<Room> {
    return this.http.get<Room>(this.url + '/' + id);
  }

  searchRooms(keywords: Array<any>): Observable<Room[]> {
    let params = new HttpParams();

    keywords.forEach(element => {
      if (element.value) {
        params = params.append('search', `${element.prop} co ${element.value}`);
      }
    });
    
    return this.http.get<Room[]>(this.url, {params: params});
  }
}
