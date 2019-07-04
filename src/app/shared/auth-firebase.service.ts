import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService, User} from './auth-service';
import * as firebase from 'firebase/app';

interface Administrator {
  uid: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthFirebaseService implements AuthService {
  user: firebase.User;
  administrators: Administrator[];

  constructor(private afAuth: AngularFireAuth,
              private fireStore: AngularFirestore) {
    fireStore.collection<Administrator>('administrators')
      .valueChanges().subscribe(
        admins => this.administrators = admins
    );
    afAuth.authState.subscribe(user => this.user = user);
  }

  getUSer(): User {
    if (!this.user) {
      return undefined;
    }
    return {uid: this.user.uid,
      email: this.user.email,
      displayName: this.user.displayName} as User;
  }

  isAdmin(): boolean {
    if (!this.isAuth()) {
      return false;
    }
    if (this.administrators) {
      return this.administrators.find(
        admin => admin.uid === this.user.uid) ? true : false;
    }
  }

  isAuth(): boolean {
    return this.user ? true : false;
  }

  login(loginMethod: string) {
    switch (loginMethod) {
      case 'google':
        this.loginWithGoogle();
        break;
      case 'facebook':
        this.loginWithFacebook();
    }
  }

  logout() {
    this.afAuth.auth.signOut().then();
  }

  private loginWithGoogle() {
    this.afAuth.auth.signInWithRedirect(
      new firebase.auth.GoogleAuthProvider())
      .then();
  }

  private loginWithFacebook() {
    this.afAuth.auth.signInWithRedirect(
      new firebase.auth.FacebookAuthProvider())
      .then();
  }
}
