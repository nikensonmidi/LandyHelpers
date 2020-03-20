import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap} from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
this.user$ = this.afAuth.authState.pipe(
  switchMap(user =>{
if (user) {
  return this.afs.doc<User>(`user/${user.uid}`).valueChanges();
} else {
  return of(null);
}

  })
);

   }

async googleSignin() {
const provider = new auth.GoogleAuthProvider();
const credential = await this.afAuth.auth.signInWithPopup(provider);
return this.updateUserData(credential.user);
}

updateUserData(user: User) {

}

}
