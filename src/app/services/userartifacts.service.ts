import { Injectable } from '@angular/core';
import * as UserData from '../../assets/userData.json';
import {  write } from 'node_modules/write-json';
import { Room } from '../models/room.js';

@Injectable({
  providedIn: 'root'
})
export class UserartifactsService {

  constructor() { }

  updateRoomList(rooms: Room[]) {
write('../../assets/userData.json', rooms, (error) => {
console.log(error);

});
  }

}
