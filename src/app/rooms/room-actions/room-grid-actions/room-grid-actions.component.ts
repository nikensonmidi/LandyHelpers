import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ErrorLog } from 'src/app/core/models/error-log';
import { Room } from 'src/app/core/models/room';
import { SelectedRoom } from 'src/app/core/models/selectedRoom';
import { ErrorLogService } from 'src/app/core/services/error-log.service';
import { RoomService } from 'src/app/core/services/room.service';
import { EditDialogComponent } from 'src/app/room-edit/edit-dialog/edit-dialog.component';


@Component({
  selector: 'app-room-grid-actions',
  templateUrl: './room-grid-actions.component.html',
  styleUrls: ['./room-grid-actions.component.scss']
})
export class RoomGridActionsComponent implements OnInit  {

  selectedRoom: SelectedRoom;

constructor(    private roomService: RoomService,
  private dialog: MatDialog,
  private errorLogService?: ErrorLogService){}
  ngOnInit(): void {

  }

agInit(params: any) {
  this.selectedRoom = params.data as SelectedRoom;
}
removeRoom(): void {
  this.roomService
    .removeRoom(this.selectedRoom)
    .then((_) => {
      window.scrollTo(0, 0);
    })
    .catch((err) => this.handleError);
}

getRoomActions(): void {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false;
  dialogConfig.autoFocus = true;
  dialogConfig.data = this.selectedRoom;
  dialogConfig.width = '100vw';

  this.dialog.open(EditDialogComponent, dialogConfig);
}

private handleError(error: any) {
  const errlog: ErrorLog = {
    name: 'RoomsComponent',
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
