import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireObject,
  AngularFireList
} from "@angular/fire/database";
import { Note } from '../models/note';
import { RoomNote } from '../models/room-note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  notes$: AngularFireList<Note>;
 roomNotes$: AngularFireList<RoomNote>;
 roomNote: RoomNote;
  constructor(private db: AngularFireDatabase) {
    this.notes$ = this.db.list('notes');
    this.roomNotes$ = this.db.list('roomNotes');
  }

  getNotes(): AngularFireList<Note> {
return this.notes$;
  }
getNote(key: string){
  return this.db.object(`notes/${key}`);
}
getRoomNotes(roomId: string) {

}
saveRoomNote(roomId: string, noteId: string) {
  this.roomNote.noteId = noteId;
  this.roomNote.roomId = roomId;
return this.roomNotes$.push(this.roomNote);
}
  updateNote(note: Note) {
   return this.notes$.update(note.key, note);
  }

saveNote(note: Note) {
  return this.notes$.push(note);
}

}
