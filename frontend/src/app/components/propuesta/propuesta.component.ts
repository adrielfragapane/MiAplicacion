import { Component, AfterViewInit, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Propuesta } from 'src/app/models/propuesta.model';
import { PropuestaService } from 'src/app/services/propuesta.service';
import { Router } from '@angular/router';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-propuesta',
  templateUrl: './propuesta.component.html',
  styleUrls: ['./propuesta.component.css']
})
export class PropuestaComponent implements OnInit, AfterViewInit {

  propuestas: Propuesta[];

  propuestasUsuario: Propuesta[];

  formPropuesta: Boolean = false;

  filtroUsuario: Boolean = true;

  editar: Boolean;

  propuestaSeleccionada: Propuesta;

  idUsuarioSeleccionado: String;

  imagenesSeleccionadas: File[];

  formData: FormData;

  URL_D : String = "http://localhost:3000/dinamico/";
  URL_E : String = "http://localhost:3000/estatico/";

  URL_D_IMGS: String = this.URL_D + "imgs/"; 
  URL_E_IMGS: String = this.URL_E + "imgs/";

  constructor(private propuestaService: PropuestaService, private router: Router) { }

  ngAfterViewInit(): void {
  }

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

  /*
  actualizarPropuesta(propuesta: Propuesta) {
    
    if(this.imagenesSeleccionadas) {
      this.formData = new FormData();
      Array.from(this.imagenesSeleccionadas).forEach( imagen => {
        propuesta.imagenes.push(imagen.name);
        this.formData.append('imagen', imagen, imagen.name);
      });
    }

    this.propuestaService.putPropuesta(propuesta)
    .subscribe(res => {
      console.log(res);
      this.getPropuestasUsuario(this.idUsuarioSeleccionado);
    });
    
    this.propuestaService.setImagenesPropuesta(this.formData)
    .subscribe(res => {
      console.log(res);
      this.getPropuestasUsuario(this.idUsuarioSeleccionado);
      this.formPropuesta = false;
    });
  }*/

  guardarPropuesta(propuesta: Propuesta) {
    if(this.imagenesSeleccionadas) {
      this.formData = new FormData();
      Array.from(this.imagenesSeleccionadas).forEach( imagen => {
        propuesta.imagenes.push(imagen.name);
        this.formData.append('imagen', imagen, imagen.name);
      });
    }

    this.propuestaService.setImagenesPropuesta(this.formData)
    .subscribe(res => {
      this.propuestaService.postPutPropuesta(propuesta,this.editar)
      .subscribe(res => {
        this.formPropuesta = false;
        this.getPropuestasUsuario(this.idUsuarioSeleccionado);
      });
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
    this.imagenesSeleccionadas = event.target.files;
  }
}
