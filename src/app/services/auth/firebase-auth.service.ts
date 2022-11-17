import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  isLoggedIn: boolean = false;

  constructor(public fbAuth: AngularFireAuth) { }

  async signin(email: string, password: string) {
    await this.fbAuth.signInWithEmailAndPassword(email, password).then(res => {
      this.isLoggedIn = true;
      localStorage.setItem('mastery_userId', JSON.stringify(res.user.uid));
    })
  }

  logout() {
    this.fbAuth.signOut();
    localStorage.removeItem('mastery_userId');
  }

  get userId() {
    const uid = localStorage.getItem('mastery_userId');
    if (!uid) {
      return null;
    } else {
      return uid;
    }
  }
}