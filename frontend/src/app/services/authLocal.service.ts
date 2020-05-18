import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Login } from '../models/login.model';
import { Signin } from '../models/signin.model';

import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
 


@Injectable({
  providedIn: 'root'
})
export class AuthLocalService {

  loggedUser: boolean;


  basePath = 'http://localhost:3000/';

  constructor(private authService: AuthService, private router: Router,private http: HttpClient) { }

  singIn(newSignIn: Signin) {
    return this.http.post<any>(this.basePath + 'singin',newSignIn);
  }

  logIn(newLogin: Login) {
    return this.http.post<any>(this.basePath + 'login', newLogin);
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  
  logout() {
      return this.http.post(this.basePath + 'logout', {});
  }
  
  private extractData(res) {
      let body = res.json();
      return body;
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.loggedUser = true;
  }
 
  signInWithFacebook(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.loggedUser = true;
  } 
 
  signOut(): void {
    this.authService.signOut();
  }
/*
  getUser() {
    return this.authService.authState;
  }

  checkToken() {
    return this.http.get(`http://localhost:3000/`);
  }*/


  sendTokenFacebook(authToken: string) {
    return this.http.post(`http://localhost:3000/auth/facebook/token`, {access_token: authToken});
  }

  

}
