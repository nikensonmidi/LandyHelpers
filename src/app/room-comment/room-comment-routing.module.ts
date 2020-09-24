import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoomCommentComponent } from './room-comment.component';

const routes: Routes = [{ path: '', component: RoomCommentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomCommentRoutingModule { }
