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
import { map } from 'rxjs/operators';
import { TIME_FORMAT } from '../globalVariables';
import { IMyOptions } from 'ng-uikit-pro-standard/lib/pro/date-picker';

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

  public myDatePickerOptions: IMyOptions = {
    // Your options
    };

  constructor(private noteServices: NoteService) {}

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
        )
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
        debugger;

        if (this.cardref.last) {
          const lastCard: HTMLElement = this.cardref.last
            .nativeElement as HTMLElement;
          lastCard.scrollIntoView();
        }
      });
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
      .filter((word, index) => index < 20)
      .join(' ');
    this.noteServices.updateNote(note);
  }
  filterNotesByContent(search: string): Note[] {
    return this.roomNotes.filter((r) => r.content.includes(search));
  }
  filterNotesByDates(from: Date, to: Date): Note[] {
    return this.roomNotes.filter((r) =>
      moment(r.dateCreated).isBetween(from, to)
    );
  }
}
