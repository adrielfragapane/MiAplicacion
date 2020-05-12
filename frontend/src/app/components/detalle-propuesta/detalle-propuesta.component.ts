import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalle-propuesta',
  templateUrl: './detalle-propuesta.component.html',
  styleUrls: ['./detalle-propuesta.component.css']
})
export class DetallePropuestaComponent implements OnInit {

  URL_D : String = "http://localhost:3000/dinamico/";
  URL_E : String = "http://localhost:3000/estatico/";

  URL_D_IMGS: String = this.URL_D + "imgs/"; 
  URL_E_IMGS: String = this.URL_E + "imgs/";
  
  constructor() { }

  ngOnInit(): void {
  }

}
