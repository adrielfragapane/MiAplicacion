import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { PropuestaComponent } from './components/propuesta/propuesta.component';
import { DetallePropuestaComponent } from './components/detalle-propuesta/detalle-propuesta.component';
import { MapComponent } from './components/map/map.component';
import { PropuestaNuevaComponent } from './components/propuestaNueva/propuestaNueva.component';
import { LoginComponent } from './components/login/login.component';


//import {HomeComponent} from "./home/home.component";
//import {LoginComponent} from "./login/login.component";
import { AuthGuard } from "./guards/auth.guard";
import { SigninComponent } from './components/signin/signin.component';
import { SocialLoginComponent } from './components/social-login/social-login.component';

const routes: Routes = [
  { path: 'facebook', component: SocialLoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signin', component: SigninComponent },
  { path: '', canActivate: [AuthGuard], children: [

    { path: 'home', component: PropuestaNuevaComponent },
    
    
    //{ path: '', redirectTo: '/home', pathMatch: 'full' },
    //{ path: '**', redirectTo: '/home'},
    { path: 'login', component: LoginComponent},
    { path: 'usuarios', component: UsuarioComponent},
    { path: 'propuestas', component: PropuestaComponent},
    { path: 'propuesta', component: DetallePropuestaComponent},
    { path: 'propuestaNueva', component: PropuestaNuevaComponent},
    { path: 'mapa', component: MapComponent}
  ]}
  
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
