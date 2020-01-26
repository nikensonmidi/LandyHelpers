import { Supervisor } from './supervisor';
import { Note } from './note';
import { runInThisContext } from 'vm';

export class Room {
  roomNumber: number;
  notes: Note[];
  latest: Date;


  constructor(roomNumber: number, notes: Note[] = []) {
this.roomNumber = roomNumber;
this.notes = notes;
this.notes.sort( (prev, next) => {
if (prev.dateCreated > next.dateCreated) {
  return 1;
}
if (prev.dateCreated < next.dateCreated) {
  return -1;
}
return 0;

});

this.latest = this.notes.length > 0 ? this.notes[0].dateCreated : null;

  }

}
