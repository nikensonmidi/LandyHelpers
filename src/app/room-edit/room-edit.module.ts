import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomEditRoutingModule } from './room-edit-routing.module';
import { RoomEditComponent } from './room-edit.component';
import { IconsModule, CardsModule } from 'ng-uikit-pro-standard';
import { FormsModule } from '@angular/forms';
import { NotesComponent } from './notes/notes.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';



@NgModule({
  declarations: [RoomEditComponent, NotesComponent, EditDialogComponent],
  imports: [
    CommonModule,
    RoomEditRoutingModule,
    IconsModule,
    CardsModule,
    FormsModule,
    MatDialogModule
  ],
  providers: [ {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}]

})
export class RoomEditModule { }
