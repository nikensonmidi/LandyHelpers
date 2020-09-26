import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupervisorsRoutingModule } from './supervisors-routing.module';
import { SupervisorsComponent } from './supervisors.component';
import { AgGridModule } from 'ag-grid-angular';
import { SupervisorsGridActionsComponent } from './supervisors-grid-actions/supervisors-grid-actions.component';


@NgModule({
  declarations: [SupervisorsComponent, SupervisorsGridActionsComponent],
  imports: [
    CommonModule,
    SupervisorsRoutingModule,
    AgGridModule.withComponents([SupervisorsGridActionsComponent])
  ]
})
export class SupervisorsModule { }
