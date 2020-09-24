import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// const routes: Routes = [
//   { path: 'room-edit/:id', component: RoomEditComponent, canActivate: [CanActivateRouteGuard]},
//   { path: '', redirectTo: 'room-edit/:id',  pathMatch: 'full' },

// ];
const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomEditRoutingModule {}
