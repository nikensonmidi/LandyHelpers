
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RoomsResolver } from './core/services/roomresolver.service';
import { CanActivateRouteGuard } from './core/guards/canactivateroute.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'rooms', loadChildren: () => import('./rooms/rooms.module').then(m => m.RoomsModule) },
  { path: 'room-edit', loadChildren: () => import('./room-edit/room-edit.module').then(m => m.RoomEditModule) },
  { path: 'roomComment', loadChildren: () => import('./room-comment/room-comment.module').then(m => m.RoomCommentModule) },
  { path: 'supervisors', loadChildren: () => import('./supervisors/supervisors.module').then(m => m.SupervisorsModule) }

];
// { path: 'room-list', component: RoomListComponent, canActivate: [CanActivateRouteGuard] },
//{ path: 'room-edit/:id', component: RoomEditComponent, canActivate: [CanActivateRouteGuard]},
@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
