import { Component, OnInit,  HostListener, ViewChild } from '@angular/core';
import { Room } from '../models/room';

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
     const tempRoom: Room = new Room(index);
     this.rooms.push(tempRoom);
    }
    this.filteredRooms = this.rooms;
    }

    filterRoomList(filter: string): Room[] {
return this.rooms.filter( r => {

return r.roomNumber.toString().includes(filter.toLowerCase().trim());

});
    }

}

