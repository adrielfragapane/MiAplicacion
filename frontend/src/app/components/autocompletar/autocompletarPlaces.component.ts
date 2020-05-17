import { Component, ViewChild, EventEmitter, Output, OnInit, AfterViewInit, Input } from '@angular/core';

@Component({
    selector: 'AutocomplarPlaces',
    template: `
      <input class="input"
        type="text"
        [(ngModel)]="autocompleteInput"
        #addresstext style="padding: 12px 20px; border: 1px solid #ccc; width: 400px"
        >
    `,
})
export class AutocompletarPlacesComponent implements OnInit, AfterViewInit {
    @Input() adressType: string;
    @Output() setAddress: EventEmitter<any> = new EventEmitter();
    @ViewChild('addresstext') addresstext: any;

    autocompleteInput: string;
    queryWait: boolean;

    constructor() {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.getPlaceAutocomplete();
    }

    private getPlaceAutocomplete() {
        const autocomplete = new google.maps.places.Autocomplete(this.addresstext.nativeElement,
            {
                componentRestrictions: { country: 'AR' },
                types: [this.adressType]  // 'establishment' / 'address' / 'geocode'
            });
        google.maps.event.addListener(autocomplete, 'place_changed', () => {
            const place = autocomplete.getPlace();
            this.invokeEvent(place);
        });
    }

    invokeEvent(place: Object) {
        this.setAddress.emit(place);
    }

}


/*

En el objeto padre colocar :



<h1> Google Places Autocomplete</h1>
    <div>
        <h2>Home Address:</h2>
        <p>
            <AutocompleteComponent (setAddress)="getAddress($event)" adressType="geocode"></AutocompleteComponent>
        </p>
        <b>Address: </b> {{formattedAddress}}
        <br><br>
        <h2>Office Address:</h2>
        <p>
            <AutocompleteComponent (setAddress)="getEstablishmentAddress($event)" adressType="establishment"></AutocompleteComponent>
        </p>
        <b>Address:</b> {{formattedEstablishmentAddress}}
        <br>
        <b>Phone:</b> {{phone}}
    </div>
*/
