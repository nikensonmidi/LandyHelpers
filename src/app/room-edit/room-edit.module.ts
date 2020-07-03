import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomEditRoutingModule } from './room-edit-routing.module';
import { RoomEditComponent } from './room-edit.component';
import { IconsModule, CardsModule } from 'ng-uikit-pro-standard';
import { FormsModule } from '@angular/forms';
import { NotesComponent } from './notes/notes.component';


@NgModule({
  declarations: [RoomEditComponent, NotesComponent],
  imports: [
    CommonModule,
    RoomEditRoutingModule,
    IconsModule,
    CardsModule,
    FormsModule,
  ]
})
export class RoomEditModule { }
