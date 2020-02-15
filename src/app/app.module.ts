
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './app.component';
import {  AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { MDBSpinningPreloader, MDBBootstrapModulesPro, ToastModule } from 'ng-uikit-pro-standard';
import { AppNavMenuComponent } from './app-nav-menu/app-nav-menu.component';

import { HomeComponent } from './home/home.component';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomEditComponent } from './room-edit/room-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    AppNavMenuComponent,
    HomeComponent,
    RoomListComponent,
    RoomEditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
AngularFireModule.initializeApp(environment.firebase),
AngularFireDatabaseModule,
    ToastModule.forRoot(),
    MDBBootstrapModulesPro.forRoot(),
    AgmCoreModule.forRoot({
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key
      apiKey: 'Your_api_key'
    }),

    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AppRoutingModule,
  ],
  providers: [MDBSpinningPreloader],
  bootstrap: [AppComponent],
  schemas:      [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
