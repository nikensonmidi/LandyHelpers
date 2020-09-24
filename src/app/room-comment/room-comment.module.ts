import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomCommentRoutingModule } from './room-comment-routing.module';
import { RoomCommentComponent } from './room-comment.component';
import {
  CardsModule,
  DatepickerModule,
  IconsModule,
} from 'ng-uikit-pro-standard';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [RoomCommentComponent],
  imports: [
    CommonModule,
    RoomCommentRoutingModule,
    CardsModule,
    FormsModule,
    IconsModule,
    DatepickerModule,
  ],
})
export class RoomCommentModule {}
