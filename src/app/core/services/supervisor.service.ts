import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ErrorLogService } from './error-log.service';

@Injectable({
  providedIn: 'root',
})
export class SupervisorService {
  supervisors$;
  constructor(
    private db: AngularFireDatabase,
    private errorLog?: ErrorLogService
  ) {
    this.supervisors$ = db.list('supervisors');
  }

  
}
