import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly APIUrl = "https://masterybackend.tk";

  constructor(
    private http: HttpClient,
    private route: Router
    ) { }

  userLogin(credentials:any){
    return this.http.post<any>(this.APIUrl + '/login', credentials).pipe(
      map(response => {
        if (response && response.jwt) {
          localStorage.setItem('schoolapp_jwt', response.jwt);
          return response;
        }
        return false;
      })
    );
  }

  userLogout(){
    let removeToken = localStorage.removeItem('schoolapp_jwt');
    if (removeToken == null) {
      this.route.navigate(['/']);
    }
  }

  get isUserLoggedIn(): boolean{
    let token = localStorage.getItem('schoolapp_jwt');
    return (token !== null) ? true : false;
  }

  get currentUser(){
    const token = localStorage.getItem('schoolapp_jwt');
    if (!token) {
      return null;
    }
    return new JwtHelperService().decodeToken(token);
  }

  getToken(){
    return localStorage.getItem('schoolapp_jwt');
  }
}
