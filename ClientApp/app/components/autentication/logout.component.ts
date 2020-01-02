import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared-service.service';

@Component({
    selector: 'logout',
    templateUrl: './logout.component.html'
})
export class LogoutComponent {
    constructor(
        @Inject('BASE_URL') public baseUrl: string,
        private _router: Router,
        public _shared: SharedService
    ) {
        this._shared.logout();
        this._router.navigate(['/login']);
    }
}