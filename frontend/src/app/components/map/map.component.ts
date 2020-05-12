import { Component, AfterViewInit, OnInit, ViewChild, ElementRef } from "@angular/core";
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  
  @ViewChild("mapContainer", { static: false }) gmap: ElementRef;

  map: google.maps.Map;
  lat = 40.73061;
  lng = -73.935242;

  position = {lat: this.lat, lng: this.lng};

  markers = [];
  infoWindows =[];

  /*
  markers = [
    {
      position: new google.maps.LatLng(40.73061, 73.935242),
      map: this.map,
      title: "Marker 1"
    },
    {
      position: new google.maps.LatLng(32.06485, 34.763226),
      map: this.map,
      title: "Marker 2"
    }
  ];*/


  //Coordinates to set the center of the map
  coordinates = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 8
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

  mapInitializer(): void {
    //Se inicializa el mapa
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);

    //Se agrega el evento click al primer marker
    this.marker.addListener("click", () => {
      const infoWindow = new google.maps.InfoWindow({
        content: this.marker.getTitle()
      });
      infoWindow.open(this.marker.getMap(), this.marker);
    });

    //Se agrega el primer marker al mapa
    this.marker.setMap(this.map);

    //Se agregan los otros markers
    this.loadAllMarkers();
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

    this.loadAllMarkers();
  }  



  loadAllMarkers(): void {
    this.markers.forEach(markerInfo => {
      //Creating a new marker object
      const marker = new google.maps.Marker({
        ...markerInfo
      });

      //creating a new info window with markers info
      const infoWindow = new google.maps.InfoWindow({
        content: marker.getTitle()
      });

      //Add click event to open info window on marker
      marker.addListener("click", () => {
        infoWindow.open(marker.getMap(), marker);
      });

      infoWindow.open(marker.getMap(), marker);

      //Adding marker to google map
      marker.setMap(this.map);
    });
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
