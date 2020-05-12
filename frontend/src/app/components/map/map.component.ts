import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {


  @ViewChild(GoogleMap, { static: false }) map: GoogleMap
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow


  logCenter() {
    console.log(JSON.stringify(this.map.getCenter()))
  }

  position = { lat: -34.6231768, lng: -58.4476364 };
  
  zoom = 12
  center: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    //mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  }






  /*
  @ViewChild("mapa") map;
  
  infoWindows: google.maps.InfoWindow;

  position = { lat: -34.6231768, lng: -58.4476364 }; 
  label = { color: 'red', text: 'marcador'};

  zoom = 12
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    zoomControl: false,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  }*/

  //map : google.maps.Map;
  //info : google.maps.InfoWindow;


  infowindows = [];

  markers = [];

  infoContent = '';

  constructor() { }

  ngOnInit(): void {



    for (var i = 0; i < this.markers.length; ++i) {

      google.maps.event.addListener(this.markers[i], 'click', (function(marker, i) {
        return function() {
          this.infowindows[i].open(this.map, this.markers[i]);
        }
      })(this.markers[i], i));

      this.infowindows[i] = new google.maps.InfoWindow({
        content: this.markers[i].getAttribute("title")
      });

    }
    

    //this.addMarker();

    //this.infoWindows = new google.maps.InfoWindow({content: 'Barcelona'});
    //this.info = new google.maps.InfoWindow();

    //this.map = new google.maps.Map();

    /*this.info = new google.maps.InfoWindow({
      content: 'Barcelona'
      });*/
  }

  openInfo(marker: MapMarker, content) {
    this.infoContent = content
    this.info.open(marker)
  }

  addMarker() {
    this.markers.push({
      position: {
        lat: this.position.lat + ((Math.random() - 0.5) * 2) / 10,
        lng: this.position.lng + ((Math.random() - 0.5) * 2) / 10,
      },
      label: {
        color: 'red',
        text: 'Marker label ' + (this.markers.length + 1),
      },
      title: 'Marker title ' + (this.markers.length + 1),
      info: 'Marker info ' + (this.markers.length + 1),
      options: {
        //animation: google.maps.Animation.BOUNCE,
      },
    });
  }

    infowindow1 = new google.maps.InfoWindow({
    content: 'Barcelona'
    });

    /*
  dobleClick(event: google.maps.MouseEvent) {
    console.log('hola');
    console.log(this.infoWindows); 
    //console.log(this.map);
  }*/

  rightClick(event: google.maps.MouseEvent) {
    console.log('click derecho');
  }
/*
  openInfo(marker: google.maps.Marker, content) {
    //console.log(this.map);
    
    console.log(this.markers);
    //this.infoWindows. = content;
    //console.log(this.map);
    //console.log(marker);
    //console.log(this.info);
    //this.infowindow1.open(this.map);
  }*/

  click(event: google.maps.MouseEvent) {
    console.log(event)
    this.logCenter();
  }

  
}
