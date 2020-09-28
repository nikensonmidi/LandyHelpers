import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorsGridActionsComponent } from './supervisors-grid-actions.component';

describe('SupervisorsGridActionsComponent', () => {
  let component: SupervisorsGridActionsComponent;
  let fixture: ComponentFixture<SupervisorsGridActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisorsGridActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisorsGridActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
