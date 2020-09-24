import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomEditRoutingModule } from './room-edit-routing.module';

import { IconsModule, CardsModule } from 'ng-uikit-pro-standard';
import { FormsModule } from '@angular/forms';

import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { RoomCommentComponent } from '../room-comment/room-comment.component';



@NgModule({
  declarations: [
     EditDialogComponent,
     RoomCommentComponent
    ],
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
