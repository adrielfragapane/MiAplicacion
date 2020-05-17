import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Signin } from 'src/app/models/signin.model';
import { AuthLocalService } from 'src/app/services/authLocal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private authService: AuthLocalService, private router: Router) { }

  newSignin: Signin;

  ngOnInit(): void {
    this.newSignin = new Signin();
  }

  signin(form: NgForm) {
    //console.log({nombre: form.value.nombre, password: form.value.password});
    //console.log('Logueado');

    this.authService.singIn(this.newSignin)
    .subscribe( res => {
      console.log(res);
      switch(res.status) {
        case 409:
          console.log('Este email ya se encuentra registrado'); break;
        case 500:
          console.log('Error en el servidor'); break;
        case 200:
          console.log('Usuario logueado correctamente'); 
          console.log(res);
          localStorage.setItem('token',res.datosUsuario.accessToken);
          this.router.navigate(['home']);
          break;
        default: 
          console.log(res); break;
      }
    });
  }

  

}
