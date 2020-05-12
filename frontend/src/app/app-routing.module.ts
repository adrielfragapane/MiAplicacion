import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { PropuestaComponent } from './components/propuesta/propuesta.component';
import { DetallePropuestaComponent } from './components/detalle-propuesta/detalle-propuesta.component';
import { MapComponent } from './components/map/map.component';


const routes: Routes = [
  {path: 'usuarios', component: UsuarioComponent},
  {path: 'propuestas', component: PropuestaComponent},
  {path: 'propuesta', component: DetallePropuestaComponent},
  {path: 'mapa', component: MapComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
