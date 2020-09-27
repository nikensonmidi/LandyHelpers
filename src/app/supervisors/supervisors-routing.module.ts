import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActivateRouteGuard } from '../core/guards/canactivateroute.guard';

import { SupervisorsComponent } from './supervisors.component';

const routes: Routes = [{ path: '', component: SupervisorsComponent , canActivate: [CanActivateRouteGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupervisorsRoutingModule { }
