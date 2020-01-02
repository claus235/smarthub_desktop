import { Component, Inject, OnInit, OnDestroy, Input } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { CurrentPrice } from "../../models/data/current-price.model";
import { CurrentPriceService } from "../../services/current-price.service";
import { Util } from "../../models/util";

@Component({
    selector: 'current-balance-usd',
    templateUrl: './current-balance-usd.component.html'
})
export class CurrentBalanceUsdComponent implements OnInit, OnDestroy {
    constructor(private _currentPriceService: CurrentPriceService) { }

    @Input() wallet: any;
    public price: CurrentPrice;
    ngOnInit(): void {
    }
    ngOnDestroy(): void {
    }
    retryStrategy() {
        return function (errors: any) {
            return errors
                .scan((acc: any, value: any) => {
                    console.log(acc, value);
                    return acc + 1;
                }, 0)
                .takeWhile((acc: any) => acc < 4)
                .delay(1000);
        }
    }
}