import { Component, OnInit,  HostListener, ViewChild } from '@angular/core';
import { Room } from '../models/room';
import { Note } from '../models/note';
import { not } from '@angular/compiler/src/output/output_ast';
import { Supervisor } from '../models/supervisor';
import { Moment } from 'node_modules/moment';

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
  constructor() { }

  ngOnInit() {
    this.headElements = ['Room', 'Latest', 'Actions'];
    this.rooms = [];
  }
  generateRoomNumbers(): void {

    for (let index = this.from; index < this.to; index++) {
    const roomNote: Note = new Note();
    roomNote.dateCreated = new Date();
    roomNote.name = 'not clean enough';
    roomNote.supervisor = [new Supervisor()];

    const tempRoom: Room = new Room(index, [roomNote]);
    this.rooms.push(tempRoom);
    }
    this.filteredRooms = this.rooms;
    }
// use momenet to drill the swearch for days

    filterRoomList(filter: string): Room[] {
return this.rooms.filter( r => {

return r.roomNumber.toString().includes(filter.toLowerCase().trim()) ||
r.latest.toDateString().includes(filter.toLowerCase().trim());
});
    }

}

