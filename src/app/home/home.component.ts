import { Component, OnInit,  HostListener, ViewChild } from '@angular/core';
import { Room } from '../models/room';
import { Note } from '../models/note';
import { not } from '@angular/compiler/src/output/output_ast';
import { Supervisor } from '../models/supervisor';
import * as moment from 'node_modules/moment';
import { UserartifactsService } from '../services/userartifacts.service';
import { map } from 'rxjs/operators';
import { AngularFireList } from '@angular/fire/database';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
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
  constructor(private userDataService: UserartifactsService) {


   }

  ngOnInit() {
    this.headElements = ['Room', 'Latest', 'Actions'];
    this.rooms = [];
    this.userDataService.getRooms().remove();
this.getRooms();
  }
  generateRoomNumbers(): void {
let tempRooms: Room[] = [];
for (let index = this.from; index <= this.to; index++) {
      // Check to see if this room already exist
const roomExist = this.rooms.some((r) =>  r.roomNumber === index);

if (!roomExist) {
  const roomNote: Note = new Note();
  roomNote.dateCreated = moment().format('DD MMM YYYY');
  roomNote.name = 'not clean enough';

  const supervisor = new Supervisor();
  roomNote.supervisors = [supervisor];

  const tempRoom: Room = new Room(index, [roomNote]);

  tempRooms.push(tempRoom);
}

    }
this.userDataService.updateRoomList(tempRooms);

this.getRooms();
    }

    getRooms(): void {
      this.userDataService.getRooms().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.key, ...c.payload.val() })
          )
        )
      ).subscribe(r => {
        this.rooms = r.sort( ( prev, next) => {
          if (prev.roomNumber > next.roomNumber) { return 1; }
           if (prev.roomNumber < next.roomNumber) { return -1; }
           return 0;
         });

        this.filteredRooms = this.rooms;
      });
    }

    filterRoomList(filter: string): Room[] {

      return this.rooms.filter( r => {

return r.roomNumber.toString().includes(filter.toLowerCase().trim()) ||
r.latest.toLowerCase().trim().includes(filter.toLowerCase().trim());


});
    }

}

