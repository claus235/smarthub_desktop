import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'addresses',
    templateUrl: './addresses.component.html'
})
export class AddressesComponent {
    constructor(@Inject('BASE_URL') baseUrl: string) {
    }
}