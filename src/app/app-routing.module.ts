import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomEditComponent } from './room-edit/room-edit.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'room-list', component: RoomListComponent },
  { path: 'room-edit', component: RoomEditComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
