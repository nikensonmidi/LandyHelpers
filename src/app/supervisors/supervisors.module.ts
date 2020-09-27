import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupervisorsRoutingModule } from './supervisors-routing.module';
import { SupervisorsComponent } from './supervisors.component';
import { AgGridModule } from 'ag-grid-angular';
import { SupervisorsGridActionsComponent } from './supervisors-grid-actions/supervisors-grid-actions.component';
import { AddSupervisorDialogComponent } from './addSupervisorDialog/add-supervisor-dialog/add-supervisor-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Supervisor } from '../core/models/supervisor';
import { MDBFileDropDirective } from 'ng-uikit-pro-standard';


@NgModule({
  declarations: [SupervisorsComponent, SupervisorsGridActionsComponent, AddSupervisorDialogComponent],
  imports: [
    CommonModule,
    SupervisorsRoutingModule,
    ReactiveFormsModule,

    AgGridModule.withComponents([SupervisorsGridActionsComponent])
  ],

  entryComponents: [AddSupervisorDialogComponent],
})
export class SupervisorsModule { }
