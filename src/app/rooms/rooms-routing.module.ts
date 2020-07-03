import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoomsComponent } from './rooms.component';
import { CanActivateRouteGuard } from '../core/guards/canactivateroute.guard';

const routes: Routes = [{ path: '', component: RoomsComponent, canActivate: [CanActivateRouteGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule { }
