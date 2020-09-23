import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed , inject} from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material';
import { RouterModule } from '@angular/router';
import {   RouterTestingModule } from '@angular/router/testing';
import { CheckboxModule, IconsModule, TableModule } from 'ng-uikit-pro-standard';
import { of } from 'rxjs';
import { Room } from '../core/models/room';
import { RoomService } from '../core/services/room.service';
import { RoomsRoutingModule } from './rooms-routing.module';

import { RoomsComponent } from './rooms.component';
class RoomServiceMock extends AngularFireDatabase {

}
describe('RoomsComponent', () => {
  let component: RoomsComponent;
  let fixture: ComponentFixture<RoomsComponent>;



  const serviceStub: any = {
    getRooms: () => of(),
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RoomsComponent],
      imports :[
        MatDialogModule,
        FormsModule,
        IconsModule,
        CheckboxModule,
        RouterTestingModule
      ],
       providers: [ {provide: AngularFireDatabase, useClass: RoomServiceMock},

        AngularFireDatabase
      // { provide: MatDialogRef, useValue: new MatDialogRef(null,null,null)}
      ]
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

});
