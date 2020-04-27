import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { Room, RoomsResolved } from '../core/models/room';
import { Note } from '../core/models/note';

import { Supervisor } from '../core/models/supervisor';
import * as moment from 'node_modules/moment';
import { map } from 'rxjs/operators';
import { AngularFireList } from '@angular/fire/database';
import { RoomService } from '../core/services/room.service';

import { Router, ActivatedRoute } from '@angular/router';
import { TIME_FORMAT } from '../globalVariables';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {
  headElements: string[];
  rooms: Room[];
  from: number;
  to: number;
  filteredRooms: Room[];


  private _searchText: string;
  public get searchText(): string {
    return this._searchText;
  }
  public set searchText(value: string) {
    this._searchText = value;
    this.filteredRooms = this._searchText
      ? this.filterRoomList(this._searchText)
      : this.rooms;
  }
  constructor(private router: Router,
              private roomService: RoomService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.headElements = ['Room', 'Latest', 'Actions'];
    this.rooms = [];
   //const resolvedRooms: RoomsResolved = this.route.snapshot.data.rooms;
    this.getRooms();
  }

  generateRoomNumbers(): void {
    const tempRooms: Room[] = [];
    for (let index = this.from; index <= this.to; index++) {
      // Check to see if this room already exist
      const roomExist = this.rooms.some(r => r.roomNumber === index);

      if (!roomExist) {
        const tempRoom: Room = new Room(index);
        tempRoom.latest = moment().format(TIME_FORMAT);
        tempRooms.push(tempRoom);
      }
    }
    this.roomService.saveRooms(tempRooms);

    this.getRooms();
  }

  getRooms(): void {
 this.roomService.getRooms()
.snapshotChanges()
.pipe(
  map(changes =>
    changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
  )
)
.subscribe(r => {
  this.rooms = r.sort((prev, next) => {
    if (prev.roomNumber > next.roomNumber) {
      return 1;
    }
    if (prev.roomNumber < next.roomNumber) {
      return -1;
    }
    return 0;
  });

  this.filteredRooms = this.rooms;
});
  }

removeRoom(room: Room): void {
  this.roomService.removeRoom(room).then(_ => {
    window.scrollTo(0, 0);
  });
}

getDetail(room: Room): void {
  this.router.navigate(['room-edit', room.key]);
}
  filterRoomList(filter: string): Room[] {
    return this.rooms.filter(r => {
      return (
        r.roomNumber.toString().includes(filter.toLowerCase().trim()) ||
        r.latest
          .toLowerCase()
          .trim()
          .includes(filter.toLowerCase().trim())
      );
    });
  }
}
