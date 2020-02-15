import { Injectable } from '@angular/core';
import { Room } from '../models/room';
import { AngularFireDatabase, AngularFireObject, AngularFireList} from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';


@Injectable({
  providedIn: 'root'
})
export class RoomService {
  rooms$: AngularFireList<Room>;

  constructor(private db: AngularFireDatabase) {
    this.rooms$ = this.db.list('rooms');
  }
      getRooms(): AngularFireList<Room> {
        return this.rooms$;
      }


}
