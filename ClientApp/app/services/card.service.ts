import { Injectable } from '@angular/core';
import { CardDetail, CardTransaction } from '../models/response/card-response.model';
import { Wallet } from '../models/data/walletv2.data.model';
import { SharedService } from './shared-service.service';
import { SpinnerService } from './spinner.service';

@Injectable()
export class CardService {
    public showPreview: boolean = true;
    public showEditCreate: boolean = false;
    public _showCardApp: boolean = false;
    public cardInfo: CardDetail;
    public currentWallet: Wallet;
    public cardDeleted: any;
    public transactions: CardTransaction[] = [];
    public cardAppType: string = 'android';
    public response: any;

    constructor(
        private _shared: SharedService,
        private _spinner: SpinnerService
    ) { }

    get noHasCard() {
        return this.currentWallet.cardId === null;
    }

    disableCards() {
        this.showEditCreate = false;
        this._showCardApp = false;
    }

    showCardApp(cardType: string) {
        this.cardAppType = cardType;
        this.disableCards();
        this._showCardApp = true;
    }

    setCardInfo(cardDetail: CardDetail) {
        this.cardInfo = cardDetail;
    }

    async getCardInfo() {
        try {
            if (this.currentWallet.cardId === undefined || this.currentWallet.cardId === null) {
                return;
            }
            this._spinner.showSpinner();
            const url = `api/card/getcard/${this.currentWallet.cardId}`;
            this.cardInfo = await this._shared.get(url).then(data => data.data);
        } catch (error) {
            console.log('Error:', error);
        } finally {
            this._spinner.hideSpinner();
        }
    }

    async getTransactions() {
        try {
            if (this.currentWallet.cardId === undefined || this.currentWallet.cardId === null) {
                return;
            }
            this._spinner.showSpinner();
            const url = `api/card/gettransactions/${this.currentWallet.cardId}`;
            this.response = await this._shared.get(url);
            if (this.response.isValid) {
                this.transactions = this.response.data;
            }
        } catch (error) {
            console.log('Error:', error);
        } finally {
            this._spinner.hideSpinner();
        }
    }
}