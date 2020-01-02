import { Component } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';

@Component({
    selector: 'app-spinner',
    template: `
        <div class="spinner" *ngIf="_spinner?.inProgress">
            <div class="dot1"></div>
            <div class="dot2"></div>
        </div>
    `
})

export class SpinnerComponent {
    constructor(public _spinner: SpinnerService) { }
}