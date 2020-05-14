import { Component, AfterViewInit, OnInit } from "@angular/core";
import { ViewChild, ElementRef, Output, EventEmitter} from "@angular/core";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  
  @ViewChild("mapContainer", { static: false }) gmap: ElementRef;

  @Output() nuevoPunto = new EventEmitter () 

  map: google.maps.Map;
  lat = -34.6231768;
  lng = -58.4476364;

  position = {lat: this.lat, lng: this.lng};

  puntoSeleccionado = {lat: this.lat, lng: this.lng};

  markers = [];
  
  markersInfo = [];
  
  infoWindows = [];

  coordinadas = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {
    center: this.coordinadas,
    zoomControl: false,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 20,
    minZoom: 8,
    zoom: 15
  };

  //Default Marker
  marker = new google.maps.Marker({
    position: this.coordinadas,
    map: this.map,
    title: "Hello World!"
  });

  constructor() { }

  ngAfterViewInit(): void {
    this.mapInitializer();
  }

  mapInitializer(): void {
    //Se inicializa el mapa
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);

    this.markersInfo.push(this.marker);

    this.addMarkerAndWindows();

    this.map.addListener('dblclick',(googleMapsEvent) => {

      this.puntoSeleccionado.lat = googleMapsEvent.latLng.lat();
      this.puntoSeleccionado.lng = googleMapsEvent.latLng.lng();
      this.nuevoPunto.emit(this.puntoSeleccionado);

      this.resetMarkersInfo();
      this.addMarkerInfo(googleMapsEvent.latLng.lat(), googleMapsEvent.latLng.lng());
      this.addMarkerAndWindows();
    });
  }

  addMarkerInfo(lat = this.position.lat, lng = this.position.lng) {
    this.markersInfo.push({
      position: {
        lat: lat,
        lng: lng,
      }
    });
  }

  addMarkerAndWindows() {
    this.markersInfo.forEach(markerInfo => {
      const marker = new google.maps.Marker({ ...markerInfo });
      const infoWindow = new google.maps.InfoWindow({ content: marker.getTitle()});
      marker.addListener("click", () => {
        infoWindow.open(marker.getMap(), marker);
      });
      marker.setMap(this.map);      
      this.markers.push(marker);
      this.infoWindows.push(infoWindow);
    });
  }

  resetMarkersInfo() {
    this.deleteMarkers();
    this.markersInfo = [];
    this.markers = [];
    this.infoWindows = [];
  }

  deleteMarkers() {
    for(let i=0;i<this.markers.length;i++)
    {this.markers[i].setMap(null);}
  }

  openWindows() {
    for(let i=0;i<this.markers.length;i++)
    {
      if(this.markers[i].getVisible())
        this.infoWindows[i].open(this.markers[i].getMap(),this.markers[i]);
    }
  }

  closeWindows() {
    for(let i=0;i<this.markers.length;i++)
    {this.infoWindows[i].close();}
  }

  showMarkers() {
    for(let i=0;i<this.markers.length;i++)
    {this.markers[i].setVisible(true);}
  }

  hideMarkers() {
    for(let i=0;i<this.markers.length;i++)
    { this.markers[i].setVisible(false);
      this.infoWindows[i].close();}
  }

  showMarker(marker: google.maps.Marker) {
    marker.setVisible(true);
  }

  hideMarker(marker: google.maps.Marker) {
    marker.setVisible(false);
  }




 

  

  addMarkerRandom() {
    this.markersInfo.push({
      position: {
        lat: this.position.lat + ((Math.random() - 0.5) * 2) / 10,
        lng: this.position.lng + ((Math.random() - 0.5) * 2) / 10,
      }/*,
      label: {
        color: 'black',
        text: ' '
      },
      title: 'Marker title ' + (this.markersInfo.length + 1),
      info: 'Marker info ' + (this.markersInfo.length + 1),
      options: {
        //animation: google.maps.Animation.BOUNCE,
      },*/
    });

    this.addMarkerAndWindows();
  }  



}