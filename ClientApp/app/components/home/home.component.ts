import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared-service.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
    address: string;

    constructor(public _shared: SharedService, private router: Router, ) {
    }

    decodedOutput(event: any) {
        this._shared.sendTo = event;
        //this.router.navigate(['/send'], { queryParams: { address: event }});
        window.location.href = "/send/" + event;
    }
}