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
    }

}

