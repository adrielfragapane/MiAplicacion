import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Propuesta } from '../models/propuesta.model';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class PropuestaService {

  constructor(private http: HttpClient, private router: Router) { }

  readonly URL_API = 'http://localhost:3000/propuestas/'

  getPropuestas() {
      return this.http.get(this.URL_API);
  }

  postPropuesta(propuesta: Propuesta) {
    return this.http.post(this.URL_API, propuesta);
  }

  putPropuesta(propuesta: Propuesta) {
    return this.http.put<Propuesta>(this.URL_API + `${propuesta._id}`, propuesta)
    .subscribe( res => {
      console.log(res);
    });
  }

  deletePropuesta(_id: String) {
    return this.http.delete(this.URL_API + `${_id}`);
  }

  getPropuestasUsuario(idUsuario: String ) {
    return this.http.get(this.URL_API + `usuario/${idUsuario}`);
}
}
