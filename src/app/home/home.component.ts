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
  roomTest: any;

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
    // this.roomTest = this.userDataService.getRooms();
    this.userDataService.getRooms().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(r => {
      this.rooms = r;
      this.filteredRooms = this.rooms;
    });
  }
  generateRoomNumbers(): void {

    for (let index = this.from; index < this.to; index++) {
    const roomNote: Note = new Note();
    roomNote.dateCreated = moment().format('DD MMM YYYY');
    roomNote.name = 'not clean enough';
    roomNote.key = index.toString();
    console.log(roomNote);
    const supervisor = new Supervisor();
    supervisor.key = index.toString();
    roomNote.supervisors = [supervisor];

    const tempRoom: Room = new Room(index, [roomNote]);
    console.log(tempRoom);
    this.rooms.push(tempRoom);
    }
    this.userDataService.updateRoomList(this.rooms);
    this.filteredRooms = this.rooms;
    }
// use momenet to drill the swearch for days

    filterRoomList(filter: string): Room[] {
      console.log(this.rooms);
      return this.rooms.filter( r => {

return r.roomNumber.toString().includes(filter.toLowerCase().trim()) ||
r.latest.toLowerCase().trim().includes(filter.toLowerCase().trim());


});
    }

}

