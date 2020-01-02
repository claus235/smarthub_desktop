import { Injectable } from '@angular/core';

@Injectable()
export class SpinnerService {
    public inProgress: boolean = false;

    constructor() { }

    showSpinner() {
        this.inProgress = true;
    }

    hideSpinner() {
        this.inProgress = false;
    }
}