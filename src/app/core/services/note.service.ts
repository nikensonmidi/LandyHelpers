import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Note } from '../models/note';
import { RoomService } from './room.service';
import * as moment from 'moment';
import { TIME_FORMAT } from '../../globalVariables';

import { ErrorLogService } from './error-log.service';
import { ErrorLog } from '../models/error-log';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  notes$: AngularFireList<Note>;

  constructor(
    private db: AngularFireDatabase,
    private roomService: RoomService,
    private errorLog?: ErrorLogService
  ) {
    this.notes$ = this.db.list('notes');
  }

  getNotes(): AngularFireList<Note> {
    return this.notes$;
  }

  getNote(key: string) {
    return this.db.object(`notes/${key}`);
  }

  getRoomNotes(roomId: string): AngularFireList<Note> {
    return this.db.list('notes', (ref) =>
      ref.orderByChild('roomid').equalTo(roomId)
    );
  }

  updateNote(note: Note) {
    return this.notes$
      .update(note.key, note)
      .catch((error) => this.handleError(error));
  }
  deleteNote(note: Note) {
    return this.notes$
      .remove(note.key)
      .catch((error) => this.handleError(error));
  }
  saveNote(note: Note) {
    const room = this.roomService.getRoom(note.roomid);
    room.update({ latest: moment().format(TIME_FORMAT) });
    return this.notes$.push(note).catch((error) => this.handleError(error));
  }
  private handleError(error) {
    const errlog: ErrorLog = {
      name: 'NoteService',
      dateCreated: new Date().toString(),
      fileName: error.fileName,
      lineNumber: error.lineNumber,
      message: error.message,
    };

    if (this.errorLog) {
      this.errorLog.logError(errlog);
    }
  }
}
