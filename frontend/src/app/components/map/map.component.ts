import { Component, AfterViewInit, OnInit, ViewChild, ElementRef } from "@angular/core";
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps'
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  
  @ViewChild("mapContainer", { static: false }) gmap: ElementRef;

  map: google.maps.Map;
  lat = -34.6231768;
  lng = -58.4476364;

  position = {lat: this.lat, lng: this.lng};

  markers = [];
  
  markersInfo = [];
  
  infoWindows = [];

  //Coordinates to set the center of the map
  coordinates = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoomControl: false,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
    zoom: 15
  };

  //Default Marker
  marker = new google.maps.Marker({
    position: this.coordinates,
    map: this.map,
    title: "Hello World!"
  });

  ngAfterViewInit(): void {
    this.mapInitializer();
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
    {
      this.infoWindows[i].close();
    }
  }

  showMarkers() {
    for(let i=0;i<this.markers.length;i++)
    {
      this.markers[i].setVisible(true);
    }
  }

  hideMarkers() {
    for(let i=0;i<this.markers.length;i++)
    {
      this.markers[i].setVisible(false);
      this.infoWindows[i].close();
    }
  }

  showMarker(marker: google.maps.Marker) {
    marker.setVisible(true);
  }

  hideMarker(marker: google.maps.Marker) {
    marker.setVisible(false);
  }

  agregarMarkerAndWindows() {
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

  mapInitializer(): void {
    //Se inicializa el mapa
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);

    this.markersInfo.push(this.marker);

    this.agregarMarkerAndWindows();
  }

  addMarker() {
    this.markersInfo.push({
      position: {
        lat: this.position.lat + ((Math.random() - 0.5) * 2) / 10,
        lng: this.position.lng + ((Math.random() - 0.5) * 2) / 10,
      },
      label: {
        color: 'black',
        text: ' '
      },
      title: 'Marker title ' + (this.markersInfo.length + 1),
      info: 'Marker info ' + (this.markersInfo.length + 1),
      options: {
        //animation: google.maps.Animation.BOUNCE,
      },
    });

    this.agregarMarkerAndWindows();
  }  
}











/*
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
    }*
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
  
}*/
