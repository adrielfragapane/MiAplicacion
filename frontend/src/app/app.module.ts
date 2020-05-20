import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { GoogleMapsModule } from '@angular/google-maps'
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AutocompletarPlacesComponent } from './components/autocompletar/autocompletarPlaces.component';
import { DetallePropuestaComponent } from './components/detalle-propuesta/detalle-propuesta.component';
import { PropuestaNuevaComponent } from './components/propuestaNueva/propuestaNueva.component';
import { SocialLoginComponent } from './components/social-login/social-login.component';
import { PropuestaComponent } from './components/propuesta/propuesta.component';

import { TokenInterceptorService } from './services/token-interceptor.service';
import { InterceptorService } from './services/interceptor.service';

import { UsuarioComponent } from './components/usuario/usuario.component';
import { SigninComponent } from './components/signin/signin.component';
import { LoginComponent } from './components/login/login.component';
import { MapComponent } from './components/map/map.component';
import { AuthGuard } from './guards/auth.guard';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ObservablesComponent } from './components/observables/observables.component';
import { PagoComponent } from './components/pago/pago.component';

let config = new AuthServiceConfig([

  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("3534806666534396")
  }/*,
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("666512875265-p7m3lj6qu1nebd6ml8jk9ehuu4vvoq0d.apps.googleusercontent.com")
  }*/
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    PropuestaComponent,
    DetallePropuestaComponent,
    PropuestaNuevaComponent,
    MapComponent,
    AutocompletarPlacesComponent,
    LoginComponent,
    SigninComponent,
    SocialLoginComponent,
    HeaderComponent,
    FooterComponent,
    ObservablesComponent,
    PagoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    GoogleMapsModule,
    SocialLoginModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
