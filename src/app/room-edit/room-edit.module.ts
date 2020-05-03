import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomEditRoutingModule } from './room-edit-routing.module';
import { RoomEditComponent } from './room-edit.component';


@NgModule({
  declarations: [RoomEditComponent],
  imports: [
    CommonModule,
    RoomEditRoutingModule
  ]
})
export class RoomEditModule { }
