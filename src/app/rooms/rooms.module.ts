import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomsComponent } from './rooms.component';
import { FormsModule } from '@angular/forms';
import { IconsModule, TableModule, CheckboxModule } from 'ng-uikit-pro-standard';
import { AgGridModule } from 'ag-grid-angular';
import { RoomGridActionsComponent } from './room-actions/room-grid-actions/room-grid-actions.component';
import { EditDialogComponent } from '../room-edit/edit-dialog/edit-dialog.component';


@NgModule({
  declarations: [RoomsComponent, RoomGridActionsComponent],
  imports: [
    CommonModule,
    RoomsRoutingModule,
    FormsModule,
    IconsModule,
    TableModule,
    CheckboxModule,
    AgGridModule.withComponents([RoomGridActionsComponent])
  ],
  entryComponents: [EditDialogComponent],
})
export class RoomsModule { }
