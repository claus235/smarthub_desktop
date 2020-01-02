import { Component, EventEmitter, Output } from '@angular/core';
import { SharedService } from '../../../services/shared-service.service';
import { Wallet } from '../../../models/data/walletv2.data.model';
import * as $ from 'jquery';
import * as _ from 'lodash';

@Component({
    selector: 'wallets-button',
    styleUrls: ['./walletsbutton.component.css'],
    templateUrl: './walletsbutton.component.html'
})

export class WalletsButtonComponent {
    @Output() onSelected: EventEmitter<any> = new EventEmitter();
    public _ = _;

    constructor(public _shared: SharedService) { }

    getWallets() {
        return this._shared.wallet;
    }

    selectWallet(wallet: Wallet) {
        this.onSelected.emit(wallet.address);
        $('.modal').hide().removeClass('show');
    }
}