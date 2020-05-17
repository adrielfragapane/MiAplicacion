import { Component, OnInit, ViewChild, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Propuesta } from 'src/app/models/propuesta.model';
import { PropuestaService } from 'src/app/services/propuesta.service';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-propuesta-nueva',
  templateUrl: './propuestaNueva.component.html',
  styleUrls: ['./propuestaNueva.component.css']
})
export class PropuestaNuevaComponent implements OnInit  {

  @ViewChild(MapComponent) mapa: MapComponent;

  editar: Boolean;

  propuestaSeleccionada: Propuesta;

  idUsuarioSeleccionado: String;

  imagenesSeleccionadas: File[];

  formData: FormData;

  URL_D : String = "http://localhost:3000/dinamico/";
  URL_E : String = "http://localhost:3000/estatico/";

  URL_D_IMGS: String = this.URL_D + "imgs/"; 
  URL_E_IMGS: String = this.URL_E + "imgs/";
  
  constructor(private propuestaService: PropuestaService) { }

  ngOnInit(): void {

    this.editar = false;
    this.propuestaSeleccionada = new Propuesta();
    this.propuestaSeleccionada.usuario = this.idUsuarioSeleccionado;

  }

  guardarPropuesta(propuesta: Propuesta) {

    console.log(propuesta);


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
        console.log(res);
      });
    });
  }

  setImagenes(event) {
    this.imagenesSeleccionadas = event.target.files;
  }

  imprimir() {
    console.log(this.mapa.puntoSeleccionado);
  }

  cambioPunto(puntoSeleccionado: any) {
    this.propuestaSeleccionada.ubicacion.latitud = puntoSeleccionado.lat;
    this.propuestaSeleccionada.ubicacion.longitud = puntoSeleccionado.lng;
  }

}
