import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomsComponent } from './rooms.component';
import { FormsModule } from '@angular/forms';
import { IconsModule, TabsModule, TableModule, CheckboxModule } from 'ng-uikit-pro-standard';


@NgModule({
  declarations: [RoomsComponent],
  imports: [
    CommonModule,
    RoomsRoutingModule,
    FormsModule,
    IconsModule,
    TableModule,
    CheckboxModule
  ]
})
export class RoomsModule { }
