import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        //console.log(this.storageService.isAuthenticated());
        // Si el usuario se encuentra logueado, se retorna true
        if (!!localStorage.getItem('token')) {//(false){//(this.storageService.isAuthenticated()) {
            console.log('tiene token');
            return true;
        }
        // Si el usuario no se encuentra logueado, se retorna false y se redirige a la página de login
        this.router.navigate(['login']);
        return false;
    }
}