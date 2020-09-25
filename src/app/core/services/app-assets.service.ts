import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,

} from '@angular/fire/database';
import { AppAsset } from '../models/app-asset';

@Injectable({
  providedIn: 'root'
})
export class AppAssetsService {

  constructor(private db: AngularFireDatabase) { }

  getAppAsset(name: string): AngularFireList<AppAsset> {
return this.db.list('appAssets', (ref) => ref.orderByChild('name').equalTo(name).limitToFirst(1));

  }
}
