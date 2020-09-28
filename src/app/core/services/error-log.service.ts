import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { ErrorLog } from '../models/error-log';

@Injectable({
  providedIn: 'root'
})
export class ErrorLogService {
log$: AngularFireList<ErrorLog>;

  constructor(private db: AngularFireDatabase) {
    this.log$ = this.db.list('errorLog');
  }

logError(error: ErrorLog): void{
this.log$.push(error);
}


}
