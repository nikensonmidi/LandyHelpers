import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Supervisor } from '../core/models/supervisor';
import { SupervisorsGridActionsComponent } from './supervisors-grid-actions/supervisors-grid-actions.component';

@Component({
  selector: 'app-supervisors',
  templateUrl: './supervisors.component.html',
  styleUrls: ['./supervisors.component.scss']
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
    { headerName: 'Action', cellRendererFramework: SupervisorsGridActionsComponent, },
  ];


filteredSupervisors: Observable<Supervisor[]>;
  gridApi: any;
  gridColumnApi: any;
  rowSelection: string;

  constructor() { }

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

  displayAddSupervisorDialog(): void{


  }

}
