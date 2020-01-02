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
import { RecoveryKey } from '../../models/response/key-response.model';

@Component({
    selector: 'terms',
    templateUrl: './terms.component.html'
})
export class TermsOfUseComponent {
    public recoveryKey: any;

    constructor(
        protected _location: Location,
        private _shared: SharedService,
        private _user: UserService
    ) {
        this.onInit();
    }
    async onInit() {
        this.recoveryKey = await this._user.getNewkey();
    }
}