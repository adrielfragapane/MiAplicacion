import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { PropuestaComponent } from './components/propuesta/propuesta.component';
import { DetallePropuestaComponent } from './components/detalle-propuesta/detalle-propuesta.component';
import { MapComponent } from './components/map/map.component';
import { PropuestaNuevaComponent } from './components/propuestaNueva/propuestaNueva.component';
import { LoginComponent } from './components/login/login.component';

import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: PropuestaNuevaComponent },  
  { path: '' , canActivate: [AuthGuard], children: [ 

    { path: 'usuarios', component: UsuarioComponent},
    { path: 'propuestas', component: PropuestaComponent},
    { path: 'propuesta', component: DetallePropuestaComponent},
    { path: 'propuestaNueva', component: PropuestaNuevaComponent},
    { path: 'mapa', component: MapComponent},
    
  ]},
  { path: '**', redirectTo: 'home'}
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
