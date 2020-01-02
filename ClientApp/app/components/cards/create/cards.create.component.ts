import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from '../../../services/shared-service.service';
import { Wallet } from '../../../models/data/walletv2.data.model';
import { CardService } from '../../../services/card.service';
import { CardCreateRequest } from '../../../models/request/card-request.model';
import { countrieList } from './countries';
import * as _ from 'lodash';
import { SpinnerService } from '../../../services/spinner.service';

@Component({
    selector: 'app-cards-create',
    templateUrl: './cards.create.component.html'
})

export class CardsCreateComponent implements OnInit {
    @Input() type: string = 'create';
    @Input() wallet: Wallet;
    public isUpdate: boolean = false;
    public response: any;
    public cardData: CardCreateRequest = new CardCreateRequest();
    public editPin: boolean = false;
    public findCountry: string = '';
    public findCurrency: string = '';

    constructor(
        private _shared: SharedService,
        public _card: CardService,
        public _spinner: SpinnerService
    ) { }

    ngOnInit() {

        
        if (!_.isUndefined(this._card.currentWallet.cardId) && this._card.currentWallet.cardId !== null) {
            this.isUpdate = true;
            this.handleUpdateData();
        }
    }

    get isCreateType() {
        return this.type === 'create';
    }

    async createCard() {
        try {
            this._spinner.showSpinner();
            const url = 'api/card/create';
            const body = {
                "address": this._card.currentWallet.address,
                "pin": this.cardData.pin,
                "name": this.cardData.name,
                "countries": this.cardData.countries,
                "email": this.cardData.email,
                "daily": {
                    "currency": this.cardData.daily.currency.toUpperCase(),
                    "maximum": this.cardData.daily.maximum
                }
            };
            this.response = await this._shared.post(url, body);
            if (this.response.isValid) {
                this._card.currentWallet.cardId = this.response.data.id;
                this._card.cardInfo = this.response.data;
                setTimeout(() => this._card.showEditCreate = false, 3000);
            }
        } catch (error) {
            console.log('Error:', error);
        } finally {
            this._spinner.hideSpinner();
        }
    }

    async updateCard() {
        try {
            this._spinner.showSpinner();
            const url = `api/card/update/${this._card.currentWallet.cardId}`;
            const body = {
                "active": this.cardData.active,
                "countries": this.cardData.countries,
                "daily": {
                    "currency": this.cardData.daily.currency.toUpperCase(),
                    "maximum": this.cardData.daily.maximum
                },
                "name": this.cardData.name,
                "pin": this.cardData.pin
            };
            this.response = await this._shared.put(url, body);
            if (this.response.isValid) {
                this._card.cardInfo = this.response.data;
                setTimeout(() => this._card.showEditCreate = false, 3000);
            }
        } catch (error) {
            console.log('Error', error);
        } finally {
            this._spinner.hideSpinner();
        }
    }

    handleUpdateData() {
        this.cardData.email = this._card.cardInfo.email;
        this.cardData.name = this._card.cardInfo.name;
        this.cardData.active = this._card.cardInfo.active;
        this.cardData.countries = this._card.cardInfo.countries;
        this.cardData.daily.currency = this._card.cardInfo.daily.currency;
        this.cardData.daily.maximum = this._card.cardInfo.daily.maximum;
    }

    getCountries() {
        let arr: any[] = [];
        Object.keys(countrieList).forEach((key) => {
            if (countrieList[key].name.toLowerCase().indexOf(this.findCountry.toLowerCase()) !== -1) {
                arr.push({ "name": countrieList[key].name, "code": key, "currency": countrieList[key].currency });
            }
        });
        return _.orderBy(arr, 'name', 'asc');
    }

    get showAutoComplete() {
        return this.findCountry.length > 0 && this.getCountries().length;
    }

    get showAutoCompleteCurrency() {
        return this.findCurrency.length > 0 && this.getCurrencies().length;
    }

    getCurrencies() {
        let arr: any[] = [];
        Object.keys(countrieList).forEach((key) => {
            if (countrieList[key].currency.toLowerCase().indexOf(this.findCurrency.toLowerCase()) !== -1 && !arr.includes(countrieList[key].currency)) {
                arr.push(countrieList[key].currency);
            }
        });
        return _.orderBy(arr, 'name', 'asc');
    }

    selectCountrie(country: any) {
        if (!country) {
            return;
        }
        country = _.find(this.getCountries(), { name: country });

        if (!this.cardData.countries.includes(country.code)) {
            this.cardData.countries.push(country.code);
        }
        this.cardData.daily.currency = country.currency;
        this.findCountry = '';
    }

    selectCurrency(currency: string) {
        if (currency === 'null' || currency === null) {
            return;
        }
        this.findCurrency = '';
        this.cardData.daily.currency = currency.toUpperCase();
    }

    trackByFn(index: number, item: any) {
        return index;
    }

    get currencyValidator() {
        if (this.findCurrency.length > 2 && !this.getCurrencies().includes(this.findCurrency.toUpperCase())) {
            return false;
        }
        return true;
    }

    removeCountry(country: string) {
        this.cardData.countries.splice(this.cardData.countries.indexOf(country), 1);
    }
}