import { Supervisor } from './supervisor';
import { Note } from './note';
import * as moment from 'node_modules/moment';


export class Room {
  key: string;
  roomNumber: number;
  latest: string;


  constructor(roomNumber: number) {
this.roomNumber = roomNumber;
// this.notes = notes;
// this.notes.sort( (prev, next) => {
// if (prev.dateCreated > next.dateCreated) {
//   return 1;
// }
// if (prev.dateCreated < next.dateCreated) {
//   return -1;
// }
// return 0;

// });

// this.latest = this.notes.length > 0 ? moment(this.notes[0].dateCreated).toDate() : null;
//this.latest = this.notes.length > 0 ? this.notes[0].dateCreated : null;

  }

}
