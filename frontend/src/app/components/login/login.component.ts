import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Login } from 'src/app/models/login.model';

import { Router } from '@angular/router';
import { AuthLocalService } from 'src/app/services/authLocal.service';
import { AuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
 
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 
  newLogin: Login

  user: SocialUser;

  loggedIn: boolean;

  constructor(private authService: AuthService, private authLocalService: AuthLocalService ,private router: Router) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      //console.log(this.user);
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  login() {
    this.authLocalService.logIn(this.newLogin)
    .subscribe( res => {
      switch(res.status) {
        case 409:
          console.log('Password incorrecto'); break;
        case 404:
          console.log('El email no está registrado'); break;
        case 200:
          localStorage.setItem('token',res.informacionUsuario.accessToken);
          this.router.navigate(['home']);
          break;
        default: 
          console.log(res); break;
      }
    });
  }

  signInWithGoogle(): void {
    if(!this.user) {
      this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }
  }
 
  signInWithFacebook(): void {
    if(!this.user) {
      this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    }
  } 
 
  signOut(): void {
    this.authService.signOut();
    this.loggedIn = false;
  }

  getUser() {
    this.authService.authState
    .subscribe ( user => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

}
