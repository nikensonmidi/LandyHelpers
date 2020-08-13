import { Injectable } from '@angular/core';
import { Room } from '../models/room';
import {
  AngularFireDatabase,
  AngularFireObject,
  AngularFireList
} from '@angular/fire/database';
import { Subject, from, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  rooms$: AngularFireList<Room>;
  subject$ = new BehaviorSubject<string>(undefined);
 currentRoom: Room;
  constructor(private db: AngularFireDatabase) {
    this.rooms$ = this.db.list('rooms');
  }
  getRooms(): AngularFireList<Room> {
    return this.rooms$;
  }
  getRoom(key: string) {
    //return this.db.list('rooms', ref => ref.orderByChild('key').equalTo(key));
    //  const room$ = new Subject<Room>();
    //  return room$.pipe(
    //    switchMap(room => this.db.list('rooms', ref => ref.orderByChild('key').equalTo(key)).valueChanges() )
    //  );
    return this.db.object(`rooms/${key}`);
  }
  saveRoom(room: Room): void {
    this.rooms$
      .push(room)
      .then(_ => console.log('success'))
      .catch(error => console.log(error));
  }

  saveRooms(rooms: Room[]): void {
    rooms.forEach(r => {
      this.saveRoom(r);
    });
  }
  editRoom(room: Room) {
    return this.rooms$.update(room.key, room);
  }
  removeRoom(room: Room) {
    return this.rooms$
      .remove(room.key)
      .then(_ => console.log('item removed from the list'));
  }
}
