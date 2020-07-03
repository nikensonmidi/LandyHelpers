import { Component, OnInit } from '@angular/core';
import { Room } from '../core/models/room';
import { RoomService } from '../core/services/room.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.scss']
})
export class RoomEditComponent implements OnInit {
  room: Room;
  constructor(
    private roomService: RoomService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const key = this.activatedRoute.snapshot.paramMap.get('id');
    this.setRoom(key);
  }

  setRoom(key: string): void {
this.roomService.getRoom(key).valueChanges().subscribe({
  next: r =>
  this.room = r as Room
}
  );

  }


}


