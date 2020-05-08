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

  editar: Boolean;

  propuestaSeleccionada: Propuesta;

  idUsuarioSeleccionado: String;

  constructor(private propuestaService: PropuestaService, private router: Router) { }

  ngOnInit(): void {
    this.idUsuarioSeleccionado = localStorage.getItem("idUsuarioSeleccionado");
    this.getPropuestasUsuario(this.idUsuarioSeleccionado);
  }

  getPropuestas() {
    this.propuestaService.getPropuestas()
    .subscribe( res => {
      this.propuestas = res as Propuesta[]; 
    });
  }

  getPropuestasUsuario(idUsuario: String) {
    this.propuestaService.getPropuestasUsuario(idUsuario)
    .subscribe( res => {
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

  actualizarPropuesta() {
    this.propuestaService.putPropuesta(this.propuestaSeleccionada)
    .subscribe( res => {
      console.log(res);
      this.getPropuestasUsuario(this.idUsuarioSeleccionado);
      this.formPropuesta = false;
    });
  }

  guardarPropuesta() {
    this.propuestaService.postPropuesta(this.propuestaSeleccionada)
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
