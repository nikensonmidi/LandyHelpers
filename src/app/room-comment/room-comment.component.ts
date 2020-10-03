import {
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Note } from '../core/models/note';
import { SelectedRoom } from '../core/models/selectedRoom';
import { NoteService } from '../core/services/note.service';
import * as moment from 'node_modules/moment';
import { catchError, map } from 'rxjs/operators';
import { TIME_FORMAT } from '../globalVariables';
import { ErrorLog } from '../core/models/error-log';
import { ErrorLogService } from '../core/services/error-log.service';

@Component({
  selector: 'app-room-comment',
  templateUrl: './room-comment.component.html',
  styleUrls: ['./room-comment.component.scss'],
})
export class RoomCommentComponent implements OnInit {
  @Input() currentRoom: SelectedRoom;
  roomNotes: Note[];
  filteredRoomNotes: Note[];
  @ViewChildren('cardref', { read: ElementRef }) cardref: QueryList<ElementRef>;
  private _searchText: string;
  public get searchText(): string {
    return this._searchText;
  }
  public set searchText(value: string) {
    this._searchText = value;
    this.filteredRoomNotes = value
      ? this.filterNotesByContent(value)
      : this.roomNotes;
  }



  constructor(private noteServices: NoteService, private errorLogService?: ErrorLogService) {}

  ngOnInit() {
    this.getRoomNotes();
  }

  getRoomNotes() {
    this.noteServices
      .getRoomNotes(this.currentRoom.key)
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.key, ...c.payload.val() }))
        ),
        catchError(err => this.handleError)
      )
      .subscribe((n) => {
        this.roomNotes = n as Note[];

        this.filteredRoomNotes = this.roomNotes;
      });
  }

  addNewNote(): void {
    const note = new Note();

    const lastRoom = this.roomNotes.find(
      (room, index) => index === this.roomNotes.length - 1
    );
    const lastCommentFilledIn = lastRoom ? !!lastRoom.content : false;
    if (lastCommentFilledIn || this.roomNotes.length === 0) {
      note.roomid = this.currentRoom.key;
      note.content = note.content ? note.content : '';
      note.name = '';
      note.dateCreated = moment().format(TIME_FORMAT);
      this.noteServices.saveNote(note).then(() => {

        if (this.cardref.last) {
          const lastCard: HTMLElement = this.cardref.last
            .nativeElement as HTMLElement;
          lastCard.scrollIntoView();
        }
      }).catch(err => this.handleError);
    }
  }

  deleteNote(note: Note): void {
    this.noteServices.deleteNote(note).then((notes) => {
      this.roomNotes = this.roomNotes.filter((r) => r.key !== note.key);
      this.filteredRoomNotes = this.roomNotes;
    });
  }

  updateNote(note: Note): void {
    note.name = note.content
      .split(' ')
      .filter((word, index) => index < 5)
      .join(' ');
    
    this.noteServices.updateNote(note).catch(err => this.handleError);
  }
  filterNotesByContent(search: string): Note[] {
    return this.roomNotes.filter((r) => r.content.includes(search));
  }
  filterNotesByDates(from: Date, to: Date): Note[] {
    return this.roomNotes.filter((r) =>
      moment(r.dateCreated).isBetween(from, to)
    );
  }

  private handleError(error: any) {
    const errlog: ErrorLog = {
      name: 'RoomCommentComponent',
      dateCreated: new Date().toString(),
      fileName: error.fileName,
      lineNumber: error.lineNumber,
      message: error.message,
    };

    if (this.errorLogService) {
      this.errorLogService.logError(errlog);
    }
  }
}
