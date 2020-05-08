import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { Propuesta } from 'src/app/models/propuesta.model';
import { PropuestaService } from 'src/app/services/propuesta.service';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-propuesta',
  templateUrl: './propuesta.component.html',
  styleUrls: ['./propuesta.component.css']
})
export class PropuestaComponent implements OnInit {

  propuestas: Propuesta[];

  propuestasUsuario: Propuesta[];

  formPropuesta: Boolean = false;

  filtroUsuario: Boolean = true;

  editar: Boolean;

  propuestaSeleccionada: Propuesta;

  idUsuarioSeleccionado: String;

  constructor(private propuestaService: PropuestaService, 
              private usuarioService: UsuarioService, 
              private router: Router) { }

  ngOnInit(): void {

    if(localStorage.getItem("idUsuarioSeleccionado")) {
      this.filtroUsuario = true;
      this.idUsuarioSeleccionado = localStorage.getItem("idUsuarioSeleccionado");
      localStorage.removeItem("idUsuarioSeleccionado");
      this.getPropuestasUsuario(this.idUsuarioSeleccionado);
    }
    else {
      this.filtroUsuario = false;
      this.getPropuestas();
    }
  }

  getPropuestas() {
    this.propuestaService.getPropuestas()
    .subscribe(res => {
      this.propuestas = res as Propuesta[]; 
    });
  }

  getPropuestasUsuario(idUsuario: String) {
    this.propuestaService.getPropuestasUsuario(idUsuario)
    .subscribe(res => {
      this.propuestasUsuario = res as Propuesta[]; 
    });
  }

  verUsuario(propuesta: Propuesta) {
    localStorage.setItem("idUsuario",propuesta.usuario.toString());
    this.router.navigate(['usuarios']);
  }

  verFormNuevaPropuesta() {
    this.formPropuesta = !this.formPropuesta;
  }

  toggleFiltroUsuario() {
    this.filtroUsuario = !this.filtroUsuario;
  }

  verTodas() {
    this.filtroUsuario = false;
    this.getPropuestas();
  }

  nuevaPropuesta() {
    this.editar = false;
    this.formPropuesta = true;
    this.propuestaSeleccionada = new Propuesta();
    this.propuestaSeleccionada.usuario = this.idUsuarioSeleccionado;
  }

  editarPropuesta(propuesta: Propuesta) {
    this.editar = true;
    this.formPropuesta = true;
    this.propuestaSeleccionada = propuesta;
  }

  actualizarPropuesta(propuesta: Propuesta) {
    this.propuestaService.putPropuesta(propuesta)
    .subscribe(res => {
      console.log(res);
      this.getPropuestasUsuario(this.idUsuarioSeleccionado);
      this.formPropuesta = false;
    });
  }

  guardarPropuesta(propuesta: Propuesta) {
    this.propuestaService.postPropuesta(propuesta)
    .subscribe(res => {
      console.log(res);
      this.getPropuestasUsuario(this.idUsuarioSeleccionado);
      this.formPropuesta = false;
    });
  }

  eliminarPropuesta(propuesta: Propuesta) {
    this.propuestaService.deletePropuesta(propuesta._id)
    .subscribe(res => {
      console.log(res);
      this.getPropuestasUsuario(this.idUsuarioSeleccionado);
    });
  }
}
