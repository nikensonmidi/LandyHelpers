import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Supervisor } from '../core/models/supervisor';
import { SupervisorService } from '../core/services/supervisor.service';
import { AddSupervisorDialogComponent } from './addSupervisorDialog/add-supervisor-dialog/add-supervisor-dialog.component';
import { SupervisorsGridActionsComponent } from './supervisors-grid-actions/supervisors-grid-actions.component';

@Component({
  selector: 'app-supervisors',
  templateUrl: './supervisors.component.html',
  styleUrls: ['./supervisors.component.scss'],
})
export class SupervisorsComponent implements OnInit {
  columnDefs = [
    {
      headerName: 'Room Number',
      field: 'roomNumber',
      sortable: true,
      filter: true,
    },
    { headerName: 'Latest', field: 'latest', sortable: true, filter: true },
    { headerName: 'Selection', checkboxSelection: true },
    {
      headerName: 'Action',
      cellRendererFramework: SupervisorsGridActionsComponent,
    },
  ];

  filteredSupervisors: Observable<Supervisor[]>;
  gridApi: any;
  gridColumnApi: any;
  rowSelection: string;

  constructor(
    private supervisorService: SupervisorService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.rowSelection = 'single';
    params.api.sizeColumnsToFit();
    window.addEventListener('resize', () => {
      setTimeout(() => {
        params.api.sizeColumnsToFit();
      });
    });

    params.api.sizeColumnsToFit();
  }

  displayAddSupervisorDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '100vw';

    this.dialog.open(AddSupervisorDialogComponent, dialogConfig);
  }
}
