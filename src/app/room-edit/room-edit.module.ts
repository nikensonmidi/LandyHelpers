import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomEditRoutingModule } from './room-edit-routing.module';

import { IconsModule, CardsModule, InputsModule, WavesModule } from 'ng-uikit-pro-standard';
import { FormsModule } from '@angular/forms';

import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { RoomCommentModule } from '../room-comment/room-comment.module';
import { RoomCommentComponent } from '../room-comment/room-comment.component';
import { EllipsisPipe } from '../shared/ellipsis.pipe';



@NgModule({
  declarations: [
     EditDialogComponent,
     RoomCommentComponent,
     EllipsisPipe
    ],
  imports: [
    CommonModule,
    RoomEditRoutingModule,
    IconsModule,
    CardsModule,
    FormsModule,
    MatDialogModule,
    InputsModule,
    WavesModule
  ],
  exports:[EllipsisPipe],
  providers: [ {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}]

})
export class RoomEditModule { }
