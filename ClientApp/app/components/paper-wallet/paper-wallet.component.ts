import { Router, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'paper-wallet',
    templateUrl: './paper-wallet.component.html',
    encapsulation: ViewEncapsulation.None
})

export class PaperWalletComponent implements OnInit {
    public listAddress = [];
    public QRCode: any;

    constructor(
        public _router: Router,
        private _route: ActivatedRoute
    ) {
        let dataAddress = this._route.snapshot.queryParams['dataAddress'];
        this.listAddress = JSON.parse(dataAddress);
    }

    ngOnInit() {
    }
}