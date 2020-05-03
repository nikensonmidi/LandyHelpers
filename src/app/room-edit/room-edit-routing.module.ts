import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoomEditComponent } from './room-edit.component';
import { CanActivateRouteGuard } from '../core/guards/canactivateroute.guard';


const routes: Routes = [
  { path: 'room-edit/:id', component: RoomEditComponent, canActivate: [CanActivateRouteGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomEditRoutingModule { }
