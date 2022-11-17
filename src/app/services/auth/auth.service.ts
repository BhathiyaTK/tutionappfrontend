import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FirebaseAuthService } from './firebase-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly APIUrl = "http://lms.clickyapp.cloud";

  constructor(
    private http: HttpClient,
    private route: Router,
    public fAuth: FirebaseAuthService
  ) { }

  userLogin(credentials: any) {
    return this.http.post<any>(this.APIUrl + '/login', credentials).pipe(
      map(response => {
        if (response && response.jwt) {
          localStorage.setItem('mastery_jwt', response.jwt);
          return response;
        }
        return false;
      })
    );
  }

  userLogout() {
    let removeToken = localStorage.removeItem('mastery_jwt');
    if (removeToken == null) {
      this.route.navigate(['/']);
      this.fAuth.logout();
    }
  }

  get isUserLoggedIn(): boolean {
    let token = localStorage.getItem('mastery_jwt');
    return (token !== null) ? true : false;
  }

  get currentUser() {
    const token = localStorage.getItem('mastery_jwt');
    if (!token) {
      return null;
    }
    return new JwtHelperService().decodeToken(token);
  }

  getToken() {
    return localStorage.getItem('mastery_jwt');
  }
}
