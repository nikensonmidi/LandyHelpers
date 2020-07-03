import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoomEditComponent } from './room-edit.component';
import { CanActivateRouteGuard } from '../core/guards/canactivateroute.guard';
import { NotesComponent } from './notes/notes.component';


// const routes: Routes = [
//   { path: 'room-edit/:id', component: RoomEditComponent, canActivate: [CanActivateRouteGuard]},
//   { path: '', redirectTo: 'room-edit/:id',  pathMatch: 'full' },


// ];
const routes: Routes = [
 {
   path: 'room-edit/:id',
   component: RoomEditComponent,
  canActivate: [CanActivateRouteGuard],
children: [
  {path: '',
   redirectTo: 'roomNotes',
  pathMatch: 'full'},

  {
    path: 'roomNotes',
    component: NotesComponent
  }
]
 }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomEditRoutingModule { }
