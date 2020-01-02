import { Component, OnInit } from '@angular/core';
import { CurrentPriceService } from "../../services/current-price.service";
import { SharedService } from '../../services/shared-service.service';
import * as _ from 'lodash';

@Component({
    selector: 'balance',
    templateUrl: './balance.component.html',
    styles: ["./balance.component.css"]
})
export class BalanceComponent implements OnInit {
    public currentPrice: Promise<any>;
    public _: any;

    constructor(
        public _currentPriceService: CurrentPriceService,
        public _shared: SharedService
    ) {
        this._ = _;
    }

    ngOnInit(): void {
        this.currentPrice = this._currentPriceService.getObservableServerCurrentPrice()!;
        this._ = _;
    }
}