import { Component, OnInit } from '@angular/core';
import { Propuesta } from 'src/app/models/propuesta.model';
import { PropuestaService } from 'src/app/services/propuesta.service';
import { Router } from '@angular/router';

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

  imagenSeleccionada: File = null;

  URL: String = "http://localhost:3000/public/imagen.jpg";

  constructor(private propuestaService: PropuestaService, private router: Router) { }

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

  votar(propuesta: Propuesta) {
    this.propuestaService.votarPropuesta(this.idUsuarioSeleccionado, propuesta._id)
    .subscribe(res => {
      console.log(res);
      this.getPropuestas();
    });
  }

  setImagenes(event) {
    
    this.imagenSeleccionada = <File> event.target.files[0];
    console.log(this.imagenSeleccionada);
  }

  onUpload() {
    const fd = new FormData();
    fd.append('image', this.imagenSeleccionada, this.imagenSeleccionada.name);
    console.log(fd);
    this.propuestaService.setImagenPropuesta(fd)
    .subscribe(res => {
      console.log(res);
    });
  }
}
