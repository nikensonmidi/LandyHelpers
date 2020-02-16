import { Component, OnInit } from '@angular/core';
import { Room } from '../models/room';
import { RoomService } from '../services/room.service';
import { ActivatedRoute } from '@angular/router';
import { Note } from '../models/note';
import { NoteService } from '../services/note.service';
import * as moment from 'node_modules/moment';
import { map } from 'rxjs/internal/operators/map';
import { RoomNote } from '../models/room-note';

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.scss']
})
export class RoomEditComponent implements OnInit {
  room: Room;
  notes: Note[];
  roomNotes: RoomNote[];
  constructor(
    private roomService: RoomService,
    private noteService: NoteService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const key = this.activatedRoute.snapshot.paramMap.get('id');
    this.getRoom(key);
  }
  getRoom(key: string) {
    this.roomService
      .getRoom(key)
      .valueChanges()
      .subscribe(r => {
        this.room = r as Room;
        this.room.key = key;
        this.noteService
          .getRoomNotes(key)
          .valueChanges()
          .subscribe(rnotes => {
            this.roomNotes = rnotes as RoomNote[];
            this.notes = this.notes ? this.notes : [new Note()];
            this.noteService
              .getNotes()
              .snapshotChanges()
              .pipe(
                map(changes =>
                  changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
                )
              )
              .subscribe(n => {
                const noteKeys = this.roomNotes.map(nk => nk.noteId);
                this.notes = n.filter(o => noteKeys.includes(o.key));
              });
          });
      });
  }
  addNote() {
    this.notes ? this.notes.push(new Note()) : [new Note()];
  }

  saveNote(note: Note) {
    note.name = this.room.roomNumber.toString();
    note.dateCreated = moment().format('DD MMM YYYY');
    this.noteService.saveNote(note).then(n => {
      this.noteService
        .saveRoomNote(this.room.key, n.key)
        .then(result => console.log(result));
    });
  }
  updateNote(note: Note) {
    this.noteService.updateNote(note);
  }
}
