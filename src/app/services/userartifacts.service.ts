import { Injectable } from '@angular/core';
import { Room } from '../models/room.js';
import {  AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UserartifactsService {
  private dbPath = '/models/room';
roomsref: AngularFireList<Room> = null;
  constructor(private db: AngularFireDatabase) {
  this.roomsref = db.list(this.dbPath);
  }

  updateRoomList(rooms: Room[]): void {

   for (let i = 0; i < rooms.length; i++) {
this.roomsref.push(rooms[i]);
   }
// this.db.list('landy').push(rooms);
  }
  getRooms(): AngularFireList<Room> {
return this.roomsref;
  }

}
