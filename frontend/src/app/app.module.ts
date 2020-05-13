import { BrowserModule } from '@angular/platform-browser';
import { GoogleMapsModule } from '@angular/google-maps'
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';



import { AppComponent } from './app.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { PropuestaComponent } from './components/propuesta/propuesta.component';
import { DetallePropuestaComponent } from './components/detalle-propuesta/detalle-propuesta.component';
import { PropuestaNuevaComponent } from './components/propuestaNueva/propuestaNueva.component';
import { MapComponent } from './components/map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    PropuestaComponent,
    DetallePropuestaComponent,
    PropuestaNuevaComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    GoogleMapsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
