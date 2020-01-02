import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import * as $ from 'jquery';
import { Wallet } from '../../models/data/walletv2.data.model';
import { Util } from '../../models/util';
import { SharedService } from '../../services/shared-service.service';
import { CardService } from '../../services/card.service';
import { SpinnerService } from '../../services/spinner.service';

@Component({
    selector: 'app-cards',
    templateUrl: './cards.component.html'
})

export class CardsComponent implements OnInit {
    public showWallets: boolean = false;
    public currentWalletIndex: number = 0;

    constructor(
        public _shared: SharedService,
        public _card: CardService,
        public _spinner: SpinnerService
    ) { }

    ngOnInit() {
        this.setDefaultWallet();
        this._card.getCardInfo();
        this._card.getTransactions();
    }

    setWallet(currentWallet: Wallet, _index?: number) {
        $('.page-wrapper').animate({ scrollTop: 0 }, 500);
        this.currentWalletIndex = _index || 0;
        this.showWallets = false;
        this._card.currentWallet = currentWallet;
        this._card.showEditCreate = false;
        this._card.getCardInfo();
        this._card.getTransactions();
        this._card.disableCards();
    }

    setDefaultWallet() {
        if (!Util.isValidObject(this._card.currentWallet))
            this._card.currentWallet = _.first(this._shared.wallet)!;
    }

    getWallets() {
        return this._shared.wallet.filter((wallet: Wallet) => !wallet.isVault && !wallet.isScheduled);
    }
}