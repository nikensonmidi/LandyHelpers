import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import {
  MDBSpinningPreloader,
  MDBBootstrapModulesPro,
  ToastModule,
} from 'ng-uikit-pro-standard';
import { AppNavMenuComponent } from './app-nav-menu/app-nav-menu.component';

import { HomeComponent } from './home/home.component';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';

import {  AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { CanActivateRouteGuard } from './core/guards/canactivateroute.guard';
import { RoomEditModule } from './room-edit/room-edit.module';
import { EditDialogComponent } from './room-edit/edit-dialog/edit-dialog.component';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { EllipsisPipe } from './shared/ellipsis.pipe';



@NgModule({
  declarations: [AppComponent, AppNavMenuComponent, HomeComponent],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    ToastModule.forRoot(),
    MDBBootstrapModulesPro.forRoot(),
    AgmCoreModule.forRoot({
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key
      apiKey: 'Your_api_key',
    }),
    AppRoutingModule,

    RoomEditModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    NgxAuthFirebaseUIModule.forRoot(environment.firebase)
  ],

  providers: [
    MDBSpinningPreloader,
    CanActivateRouteGuard,
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]

})
export class AppModule {}
