import { Component, OnInit, Input } from '@angular/core';
import { Room } from '../../core/models/room';
import { RoomService } from '../../core/services/room.service';
import { ActivatedRoute } from '@angular/router';
import { Note } from '../../core/models/note';
import { NoteService } from '../../core/services/note.service';
import * as moment from 'node_modules/moment';
import { map } from 'rxjs/internal/operators/map';
import { RoomNote } from '../../core/models/room-note';
import { TIME_FORMAT } from '../../globalVariables';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  notes: Note[];
  roomNotes: RoomNote[];
  navigationFlags: NavigationFlag[] = [{ name: 'note', value: false }];
  constructor(
    private roomService: RoomService,
    private noteService: NoteService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getRoomNotes(this.roomService.currentRoom);
  }
  getRoomNotes(room: Room) {

    this.noteService
      .getRoomNotes(room.key)
      .valueChanges()
      .subscribe((rnotes) => {

        this.roomNotes = rnotes as RoomNote[];
        this.notes = this.roomNotes.length === 0 ? [new Note()] : this.notes;
        this.noteService
          .getNotes()
          .snapshotChanges()
          .pipe(

            map((changes) =>
              changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
            )
          )
          .pipe(
            map((n) => {

              const noteKeys = this.roomNotes.map((nk) => nk.noteId);
              this.notes = n.filter((o) => noteKeys.includes(o.key));
              this.notes = this.notes.length === 0 ? [new Note()] : this.notes;
            })
          );
      });
  }
  addNote() {
    // tslint:disable-next-line: no-unused-expression
    this.notes ? this.notes.push(new Note()) : [new Note()];
  }

  saveNote(note: Note) {
    const room = this.roomService.currentRoom;
    note.name = room.roomNumber.toString();
    note.dateCreated = moment().format(TIME_FORMAT);

    this.noteService.saveNote(note).then((n) => {
      this.noteService
        .saveRoomNote(room.key, n.key)
        .then((result) => console.log(result));
    });
  }
  updateNote(note: Note) {
    this.noteService.updateNote(note);
  }
  removeNote(note: Note) {
    this.notes = this.notes.filter((n) => n !== note);
  }
}
interface NavigationFlag {
  name: string;
  value: boolean;
}
