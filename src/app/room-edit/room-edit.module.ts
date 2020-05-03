import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomEditRoutingModule } from './room-edit-routing.module';
import { RoomEditComponent } from './room-edit.component';
import { IconsModule, CardsModule } from 'ng-uikit-pro-standard';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [RoomEditComponent],
  imports: [
    CommonModule,
    RoomEditRoutingModule,
    IconsModule,
    CardsModule,
    FormsModule
  ]
})
export class RoomEditModule { }
