import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireObject,
  AngularFireList
} from '@angular/fire/database';
import { Note } from '../core/models/note';
import { RoomNote } from '../core/models/room-note';
import { RoomService } from './room.service';
import { Room } from '../core/models/room';
import * as moment from 'moment';
import { TIME_FORMAT } from '../globalVariables';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  notes$: AngularFireList<Note>;
 roomNotes$: AngularFireList<RoomNote>;
 roomNote: RoomNote;
  constructor(private db: AngularFireDatabase,
              private roomService: RoomService) {
    this.notes$ = this.db.list('notes');
    this.roomNotes$ = this.db.list('roomNotes');
    this.roomNote = new RoomNote();
  }

  getNotes(): AngularFireList<Note> {
return this.notes$;
  }
getNote(key: string){
  return this.db.object(`notes/${key}`);
}
getRoomNotes(roomId: string) {
return this.db.list('roomNotes', ref => ref.orderByChild('roomId').equalTo(roomId));
}
saveRoomNote(roomId: string, noteId: string) {
  this.roomNote.noteId = noteId;
  this.roomNote.roomId = roomId;
  //update room latest date modified
  const room = this.roomService.getRoom(roomId);
  room.update({latest: moment().format(TIME_FORMAT)});
  return this.roomNotes$.push(this.roomNote);
}
  updateNote(note: Note) {
   return this.notes$.update(note.key, note);
  }

saveNote(note: Note) {
  return this.notes$.push(note);
}

}
