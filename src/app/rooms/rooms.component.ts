import { Component, OnInit } from '@angular/core';
import { Room } from '../core/models/room';

import * as moment from 'node_modules/moment';
import { map } from 'rxjs/operators';

import { RoomService } from '../core/services/room.service';

import { Router } from '@angular/router';
import { TIME_FORMAT } from '../globalVariables';
import { SelectedRoom } from '../core/models/selectedRoom';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { EditDialogComponent } from '../room-edit/edit-dialog/edit-dialog.component';


@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit {
  headElements: string[];
  rooms: Room[];
  from: number;
  to: number;
  filteredRooms: SelectedRoom[];

  private _searchText: string;
  public get searchText(): string {
    return this._searchText;
  }
  public set searchText(value: string) {
    this._searchText = value;
    this.filteredRooms = this._searchText
      ? this.filterRoomList(this._searchText)
      : (this.rooms as SelectedRoom[]);
  }
  constructor(
    private router: Router,
    private roomService: RoomService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.headElements = ['Room', 'Latest', 'Action', 'Selections'];
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
      .filter((generated) => this.rooms.filter((r) => r.roomNumber === generated).length === 0)
      .map((generated) => {
        const tempRoom: Room = new Room(generated);
        tempRoom.latest = moment().format(TIME_FORMAT);
        return tempRoom;
      });

    this.roomService.saveRooms(tempRooms);

    this.getRooms();
  }

  getRooms(): void {
    this.roomService
      .getRooms()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({
            key: c.payload.key,
            selected: false,
            ...c.payload.val(),
          }))
        )
      )
      .subscribe((r) => {
        this.rooms = r.sort((prev, next) => {
          if (prev.roomNumber > next.roomNumber) {
            return 1;
          }
          if (prev.roomNumber < next.roomNumber) {
            return -1;
          }
          return 0;
        });

        this.filteredRooms = this.rooms as SelectedRoom[];
      });
  }

  removeRoom(room: Room): void {
    this.roomService.removeRoom(room).then((_) => {
      window.scrollTo(0, 0);
    });
  }
  removeRooms(): void {
    console.log(this.filteredRooms.filter((r) => r.selected));
  }

  getDetail(room: Room): void {
    this.router.navigate(['room-edit', room.key]);
  }
  getRoomActions(room: SelectedRoom): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = room;
    dialogConfig.width = '100vw';

    this.dialog.open(EditDialogComponent, dialogConfig);
  }
  filterRoomList(filter: string): SelectedRoom[] {
    return this.rooms.filter((r) => {
      return (
        r.roomNumber.toString().includes(filter.toLowerCase().trim()) ||
        r.latest.toLowerCase().trim().includes(filter.toLowerCase().trim())
      );
    }) as SelectedRoom[];
  }
}
