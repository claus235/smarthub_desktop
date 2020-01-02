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
    selector: 'button-refresh',
    template: `
        <button (click)="refreshClicked()" id="btn-refresh" class="btn">
            <i class="icon-refresh-button" [ngClass]="{'inProgress': inProgress}" aria-hidden="true"></i>
        </button>
    `
})
export class ButtonRefreshComponent implements OnInit {
    constructor(
        protected _location: Location,
        private _shared: SharedService,
        private _wallet: WalletService
    ) { }

    inProgress: boolean = false;

    async refreshClicked() {
        try {
            this.inProgress = true;
            await this._wallet.getWallet();
        } catch (e) {
            console.log(e);
        } finally {
            this.inProgress = false;
        }
    }

    ngOnInit() {
        if (!Util.isValidObject(this._shared.refreshInterval)) {
            this._shared.refreshInterval =
                setInterval(() => {
                    let fieldValue = $("#btn-refresh").click();
                }, 30000);
        }
    }
}