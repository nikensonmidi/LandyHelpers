import { Component, OnInit, ViewChild } from '@angular/core';
import { Room } from '../core/models/room';

import * as moment from 'node_modules/moment';
import { filter, map, tap } from 'rxjs/operators';

import { RoomService } from '../core/services/room.service';

import { Router } from '@angular/router';
import { TIME_FORMAT } from '../globalVariables';
import { SelectedRoom } from '../core/models/selectedRoom';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditDialogComponent } from '../room-edit/edit-dialog/edit-dialog.component';
import { ErrorLogService } from '../core/services/error-log.service';
import { ErrorLog } from '../core/models/error-log';
import { Observable, of } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import { RoomGridActionsComponent } from './room-actions/room-grid-actions/room-grid-actions.component';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit {
  @ViewChild('roomGrid') roomGrid: AgGridAngular;
  columnDefs = [
    {
      headerName: 'Room Number',
      field: 'roomNumber',
      sortable: true,
      filter: true,
    },
    { headerName: 'Latest', field: 'latest', sortable: true, filter: true },
    { headerName: 'Selection', checkboxSelection: true },
    { headerName: 'Action', cellRendererFramework: RoomGridActionsComponent, },
  ];

  gridApi;
  gridColumnApi;
  rowSelection: string;
  selectedRooms: SelectedRoom[];

  //  end of new grid setup
  headElements: string[];
  rooms: Room[];
  from: number;
  to: number;
  filteredRooms: Observable<SelectedRoom[]>;
  deleteAllBtnDisabled: Observable<'' | 'disabled'>;


  constructor(
    private router: Router,
    private roomService: RoomService,
    private errorLogService?: ErrorLogService
  ) {}

  ngOnInit() {
    // this.headElements = ['Room', 'Latest', 'Action', 'Selections'];
    this.rooms = [];

    // const resolvedRooms: RoomsResolved = this.route.snapshot.data.rooms;
    this.getRooms();
  }

  generateRoomNumbers(): void {
    const from = this.from;
    const to = this.to;

    const tempRooms: Room[] = Array.from(
      { length: to },
      (x, index) => index + from
    )
      .filter(
        (generated) =>
          this.rooms.filter((r) => r.roomNumber === generated).length === 0
      )
      .map((generated) => {
        const tempRoom: Room = new Room(generated);
        tempRoom.latest = moment().format(TIME_FORMAT);
        return tempRoom;
      });

    this.roomService.saveRooms(tempRooms);

    this.getRooms();
  }

  getRooms(): void {
    this.filteredRooms = this.roomService
      .getRooms()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map(
            (c) =>
              ({
                key: c.payload.key,
                selected: false,
                ...c.payload.val(),
              } as SelectedRoom)
          )
        ),
        tap(
          (rooms) =>
            (this.deleteAllBtnDisabled = rooms.some((r) => r.selected)
              ? of('')
              : of('disabled'))
        )
      );
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.rowSelection = 'single';
    params.api.sizeColumnsToFit();
    window.addEventListener('resize', () => {
      setTimeout(() => {
        params.api.sizeColumnsToFit();
      });
    });

    params.api.sizeColumnsToFit();
  }
  onRecordSelected() {
    const selectedNodes = this.roomGrid.api.getSelectedNodes();
    this.selectedRooms = selectedNodes.map((node) => node.data);

    this.deleteAllBtnDisabled =
      this.selectedRooms.length > 0 ? of('') : of('disabled');
  }


  removeRoom(room: Room): void {
    this.roomService
      .removeRoom(room)
      .then((_) => {
        window.scrollTo(0, 0);
      })
      .catch((err) => this.handleError);
  }
  removeRooms(): void {
    this.selectedRooms.forEach((r) => this.removeRoom(r));
  }

  getDetail(room: Room): void {
    this.router.navigate(['room-edit', room.key]);
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
