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

  formUsuario: Boolean = false;

  editar: Boolean;

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios() {
    this.usuarioService.getUsuarios()
    .subscribe(res => {
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
    this.router.navigate(['propuestas']);
  }

  verFormNuevoUusario() {
    this.formUsuario = !this.formUsuario;
  }

  nuevoUsuario() {
    this.editar = false;
    this.formUsuario = true;
    this.usuarioSeleccionado = new Usuario();
  }

  editarUsuario(usuario: Usuario) {
    this.editar = true;
    this.formUsuario = true;
    this.usuarioSeleccionado = usuario;
  }

  actualizarUsuario(usuario: Usuario) {
    this.usuarioService.putUsuario(usuario)
    .subscribe( res => {
      console.log(res);
      this.getUsuarios();
    });
    this.formUsuario = false;
  }

  guardarUsuario(usuario: Usuario) {
    this.usuarioService.postUsuario(usuario)
    .subscribe(res => {
      console.log(res);
      this.getUsuarios();
      this.formUsuario = false;
    });
  }

  eliminarUsuario(usuario: Usuario) {
    this.usuarioService.deleteUsuario(usuario._id)
    .subscribe(res => {
      console.log(res);
      this.getUsuarios();
    });
  }

}
