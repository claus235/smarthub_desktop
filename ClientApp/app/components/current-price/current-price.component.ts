import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { CurrentPrice } from "../../models/data/current-price.model";
import { CurrentPriceService } from "../../services/current-price.service";
import { Util } from "../../models/util";
import { SharedService } from '../../services/shared-service.service';

@Component({
    selector: 'current-price',
    templateUrl: './current-price.component.html'
})
export class CurrentPriceComponent implements OnInit {
    public currentPrice: any;

    constructor(public _currentPriceService: CurrentPriceService,
        public _shared: SharedService) { }

    async ngOnInit() {
        this.currentPrice = await this._currentPriceService.getObservableServerCurrentPrice()!;
    }
}