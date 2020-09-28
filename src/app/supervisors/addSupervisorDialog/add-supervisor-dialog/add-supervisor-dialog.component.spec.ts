import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSupervisorDialogComponent } from './add-supervisor-dialog.component';

describe('AddSupervisorDialogComponent', () => {
  let component: AddSupervisorDialogComponent;
  let fixture: ComponentFixture<AddSupervisorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSupervisorDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSupervisorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
