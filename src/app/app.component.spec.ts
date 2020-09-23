import { TestBed, async } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MDBBootstrapModule, MdbIconComponent, MDBSpinningPreloader } from 'ng-uikit-pro-standard';
import { AppComponent } from './app.component';
import { CanActivateRouteGuard } from './core/guards/canactivateroute.guard';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MdbIconComponent,
MDBBootstrapModule.forRoot()
      ],
      providers: [MDBSpinningPreloader, AngularFireAuth, AngularFirestore, CanActivateRouteGuard],
    }).compileComponents();
  }));

  // it('should create the app', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app).toBeTruthy();
  // });

  // it(`should have as title 'LANDY HELPERS'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('LANDY HELPERS');
  // });
});
