import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Propuesta } from '../models/propuesta.model';

@Injectable({
  providedIn: 'root'
})
export class PropuestaService {

  constructor(private http: HttpClient, private router: Router) { }

  readonly URL_API = 'http://localhost:3000/propuestas/'

  getPropuestas() {
    return this.http.get<Propuesta[]>(this.URL_API);
  }

  postPropuesta(propuesta: Propuesta) {
    return this.http.post<Propuesta>(this.URL_API, propuesta);
  }

  putPropuesta(propuesta: Propuesta) {
    return this.http.put<Propuesta>(this.URL_API + `${propuesta._id}`, propuesta);
  }

  deletePropuesta(_id: String) {
    return this.http.delete(this.URL_API + `${_id}`);
  }

  getPropuestasUsuario(idUsuario: String ) {
    return this.http.get<Propuesta[]>(this.URL_API + `usuario/${idUsuario}`);
  }

  votarPropuesta(idUsuario: String, idPropuesta: String) {
    return this.http.put(this.URL_API + 'votar', { usuario: idUsuario, propuesta: idPropuesta });
  }

  setImagenesPropuesta(fd: FormData) {
    return this.http.post(this.URL_API + 'upload', fd);
  }

  postPutPropuesta(propuesta: Propuesta,editar: Boolean) {
    console.log(propuesta);
    if(editar) {
      return this.http.put<Propuesta>(this.URL_API + `${propuesta._id}`, propuesta);
    }
    else {
      return this.http.post<Propuesta>(this.URL_API, propuesta);
    }
    
  }

}
