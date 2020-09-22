import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsComponent } from './rooms.component';

describe('RoomsComponent', () => {
  let component: RoomsComponent;
  let fixture: ComponentFixture<RoomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RoomsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should Filter list to room 3', () => {
    component.searchText = '3';
    const listHasRoomNumberThree = component.filteredRooms.some(
      (room) => room.roomNumber === 3
    );
    const listHasOnlyOneRoom = component.filteredRooms.length === 1;

    expect(listHasOnlyOneRoom && listHasRoomNumberThree).toBe(true);
  });
  it('should not Filter list', () => {
    component.searchText = '';
    const listHasMoreThanOne = component.filteredRooms.length > 1;
    expect(listHasMoreThanOne).toBe(true);
  });
});
