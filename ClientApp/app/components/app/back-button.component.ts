import { SharedService } from '../../services/shared-service.service';
import { CurrencyPipe } from '@angular/common/src/pipes/number_pipe';
import { CurrentPrice } from '../../models/data/current-price.model';
import { CurrentPriceService } from '../../services/current-price.service';
import { Component, Inject, OnInit } from '@angular/core';
import { CoolLocalStorage } from "angular2-cool-storage";
import { BaseLocalStorageService } from "../../services/base-localstore.service";
import { WalletService } from "../../services/wallet.service";
import { UserService } from "../../services/user.service";
import { Util } from "../../models/util";
import { Location } from '@angular/common';

@Component({
    selector: 'button-back',
    template: '<button (click)="backClicked()" class="btn btn-secondary"><i class="fa fa-hand-o-left" aria-hidden="true"></i> Back</button>'
})
export class ButtonBackComponent {
    constructor(
        protected _location: Location
    ) {
    }
    backClicked() {
        this._location.back();
    }
}