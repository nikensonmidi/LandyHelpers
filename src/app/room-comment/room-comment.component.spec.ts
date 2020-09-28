import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomCommentComponent } from './room-comment.component';

describe('RoomCommentComponent', () => {
  let component: RoomCommentComponent;
  let fixture: ComponentFixture<RoomCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
