import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth, firestore } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;
user: User;
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    // const provider = new auth.EmailAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    this.user = credential.user;
    this.setSessionLogin(true);
    return this.updateUserData(credential.user);
  }
  async emailSignin() {
    const provider = new auth.EmailAuthProvider();

    const credential = await this.afAuth.auth.signInWithPopup(provider);
    this.user = credential.user;
    this.setSessionLogin(true);
    return this.updateUserData(credential.user);
  }
  private setSessionLogin(isLogin: boolean) {
    const loginState = isLogin ? 'true' : 'false';
    sessionStorage.setItem('islogin', loginState);
    if (isLogin) { sessionStorage.setItem('user', JSON.stringify(this.user)); }

  }

  async signOut() {
    await this.afAuth.auth.signOut();
    this.user = null;
    this.setSessionLogin(false);
    return this.router.navigate(['/']);
  }
 userIsAuthenticated(): boolean {
const isLogin = sessionStorage.getItem('islogin');
this.user = /true/.test(isLogin) ? JSON.parse( sessionStorage.getItem('user')) as User : this.user;
return this.user !== null && this.user !== undefined;
 }
  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName
    };

    return userRef.set(userData, { merge: true });
  }
}
