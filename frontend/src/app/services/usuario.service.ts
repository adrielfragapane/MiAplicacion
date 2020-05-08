import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Usuario } from 'src/app/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient, private router: Router) { }

  readonly URL_API = 'http://localhost:3000/usuarios/'

  getUsuarios() {
      return this.http.get<Usuario[]>(this.URL_API);
  }

  getUsuario(_id: String) {

    return this.http.get<Usuario>(this.URL_API + `${_id}`);
}

  postUsuario(usuario: Usuario) {
    return this.http.post<Usuario>(this.URL_API, usuario);
  }

  putUsuario(usuario: Usuario) {
    return this.http.put<Usuario>(this.URL_API + `${usuario._id}`, usuario);
  }

  deleteUsuario(_id: String) {
    return this.http.delete<Usuario>(this.URL_API + `${_id}`);
  }

}
