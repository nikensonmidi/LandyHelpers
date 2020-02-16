import { Component, OnInit } from "@angular/core";
import { Room } from "../models/room";
import { RoomService } from "../services/room.service";
import { ActivatedRoute } from "@angular/router";
import { Note } from "../models/note";
import { NoteService } from "../services/note.service";
import * as moment from 'node_modules/moment';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: "app-room-edit",
  templateUrl: "./room-edit.component.html",
  styleUrls: ["./room-edit.component.scss"]
})
export class RoomEditComponent implements OnInit {
  room: Room;
  notes: Note[];
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
        const noteKeys = this.room.notes?this.room.notes:[];
          this.notes = [new Note()];

        this.noteService
          .getNotes()
          .snapshotChanges()
          .pipe(
            map(changes =>
              changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
            )
          )
          .subscribe(n => {
            debugger
            const tempNote = n as Note[];
           let tempNotes = tempNote.filter( tempNote =>  noteKeys.includes(tempNote.key));
           tempNotes.forEach(e => this.notes.push(e));

          });
      });
  }

  saveNote(note: Note, roomId: string) {
   note.name = note.content.slice(0, 10);
   note.dateCreated = moment().format('DD MM YYYY');
this.noteService.saveNote(note).then(n => {
  this.room.notes? this.room.notes.push(n.key): this.room.notes = [n.key];
  debugger
  this.roomService.editRoom(this.room);
})
  }
updateNote(note: Note) {
this.noteService.updateNote(note);
}

}
