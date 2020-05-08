import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuarios: Usuario[];

  usuarioSeleccionado: Usuario;

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {

    this.getUsuarios();
  }

  getUsuarios() {
    this.usuarioService.getUsuarios()
    .subscribe(res => {
      console.log(res);
      this.usuarios = res as Usuario[]; 
    });
  }

  getUsuario(_id: String) {
    this.usuarioService.getUsuario(_id)
    .subscribe(res => {
      console.log(res);
      this.usuarioSeleccionado = res as Usuario;
    })
  }

  verPropuestas(usuario: Usuario) {
    localStorage.setItem("idUsuarioSeleccionado",usuario._id.toString());
    console.log(localStorage.getItem("idUsuarioSeleccionado"));
    this.router.navigate(['propuestas']);
  }

}
