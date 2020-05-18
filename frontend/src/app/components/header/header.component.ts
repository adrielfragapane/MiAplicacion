import { Component, OnInit } from '@angular/core';

import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { AuthService } from 'angularx-social-login';
import { SocialUser } from "angularx-social-login";
import { AuthLocalService } from 'src/app/services/authLocal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: SocialUser;

  loggedIn: boolean;

  logged : boolean;

  constructor(private authLocalService: AuthLocalService ,private authService: AuthService) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });

    //this.checkToken()
  }


  signInWithGoogle(): void {
    if(!this.user) {
      this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }
  }
 
  signInWithFacebook(): void {
    if(!this.user) {
      this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
      .then( user => {
        //console.log('Usuario devuelto por Facebook');
        //console.log(user);
        return this.authLocalService.sendTokenFacebook(user.authToken).toPromise();})
      .then( res => {
        console.log(res);
          //console.log(res['token']);
          //console.log(res['expiresIn']);
          localStorage.setItem('token',res['token']);
      })
      .catch(err => {
        console.log(err);
      });
    }
  } 

  signOut(): void {
    this.authService.signOut();
  }

/*
  checkToken() {
    this.authLocalService.checkToken()
    .subscribe( res => {
      //console.log(res);
      this.logged = res['success']
    });
  }*/
    
/*
  getUser() {
    this.authService.authState
    .subscribe ( user => {

      //this.authService

      //this.http.post(`http://localhost:8000/users/auth/facebook`, {access_token: result.authResponse.accessToken})

      //this.user = user;
      //this.loggedIn = (user != null);
      //return this.http.post(`http://localhost:8000/users/auth/facebook`, {access_token: result.authResponse.accessToken})
    });
  }*/
}
