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

  infowindows = [];

  markers = [];

  infoContent = '';

  constructor() { }

  ngOnInit(): void {

    /*for (var i = 0; i < this.markers.length; ++i) {

      google.maps.event.addListener(this.markers[i], 'click', (function(marker, i) {
        return function() {
          this.infowindows[i].open(this.map, this.markers[i]);
        }
      })(this.markers[i], i));

      this.infowindows[i] = new google.maps.InfoWindow({
        content: this.markers[i].getAttribute("title")
      });
    }*/
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

  rightclick(event: google.maps.MouseEvent) {
    console.log('click derecho');
    console.log({lng: event.latLng.lng(), lat: event.latLng.lat()});
  }

  dblclick(event: google.maps.MouseEvent) {
    console.log('doble click');
    console.log({lng: event.latLng.lng(), lat: event.latLng.lat()});
  }

  click(event: google.maps.MouseEvent) {
    console.log('click');
    console.log({lng: event.latLng.lng(), lat: event.latLng.lat()});
  }

  logCenter() {
    console.log(JSON.stringify(this.map.getCenter()))
  }
  
}
