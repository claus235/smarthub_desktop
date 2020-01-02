import { ActivatedRoute } from '@angular/router';
import { CurrentPriceService } from '../../services/current-price.service';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { WalletService } from "../../services/wallet.service";
import { CurrentPrice } from "../../models/data/current-price.model";
import { Util } from "../../models/util";
import { SharedService } from '../../services/shared-service.service';
import { TransactionFilterPipe } from '../../pipes/transaction-filter.pipe';
import { Observable } from 'rxjs/Observable';
import { Wallet } from '../../models/data/walletv2.data.model';
import * as _ from 'lodash';
import { DOCUMENT } from '@angular/platform-browser';
import * as $ from "jquery";
import { SpinnerService } from '../../services/spinner.service';
import { pureObjectDef } from '@angular/core/src/view';

@Component({
    selector: 'transactions',
    templateUrl: './transactions.component.html',
})
export class TransactionsComponent implements OnInit {
    filteredTransactions: any[];
    public currentPrice: any;
    id: string;
    private sub: any;
    currentWalletAddress: string;
    walletIndex: number = 0;
    _listFilter: string = "";
    currentWallet: Wallet;
    public showWallets: boolean = false;
    public filters: string[] = ['All Transactions', 'Received', 'Awaiting', 'Paid'];
    public filterType: string = this.filters[0];
    public _toggleTransaction: number = -1;
    public scheduledList: any = [];
    public recurringList: any = [];
    public filterScheduled: string = "Transactions";
    public response: any;
    public _cancelScheduled: any = {} as {};

    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredTransactions = this.performFilter(this.listFilter);
    }
    performFilter(filterBy: string): any[] {
        return this._shared.wallet[0].transactions;
    }
    constructor(
        @Inject('BASE_URL') public baseUrl: string,
        public _currentPriceService: CurrentPriceService,
        private route: ActivatedRoute,
        public _shared: SharedService,
        @Inject(DOCUMENT) private document: any,
        public _spinner: SpinnerService
    ) {
        if (!Util.isValidObject(this.currentWallet)) {
            this.currentWallet = _.first(this._shared.wallet)!;
            this.walletIndex = 0;
        }
    }
    setWallet(wallet: Wallet, index?: number) {
        this.currentWallet = wallet;
        this.walletIndex = index || 0;
        this.showWallets = false;
        this.filterScheduled = 'Transactions';
    }
    async ngOnInit() {
        await this.getScheduled();
        await this.getRecurring();
        this.currentPrice = await this._currentPriceService.getObservableServerCurrentPrice()!;
        this.listFilter = "";
        this.walletIndex = 0;
        this.route.params.subscribe(params => {
            this.id = params['id'];
            if (Util.isValidAndNotEmpty(this.id)) {
                this.listFilter = this.id;
            }

            this.currentWalletAddress = params['currentWalletAddress'];
            if (Util.isValidAndNotEmpty(this.currentWalletAddress)) {
                this.listFilter = this.currentWalletAddress;
            }
        });

        this.route.queryParams.subscribe(params => {
            if (Util.isValidAndNotEmpty(params['filter']) && params['filter'] === 'vaultScheduled') {
                this.currentWallet = _.find(this._shared.wallet, { isVault: true }) as Wallet;
                this.filterScheduled = 'Scheduled';
            }
            if (Util.isValidAndNotEmpty(params['filter']) && params['filter'] === 'scheduledPayment') {
                this.currentWallet = _.find(this._shared.wallet, { isScheduled: true }) as Wallet;
                this.filterScheduled = 'Scheduled';
            }
            if (Util.isValidAndNotEmpty(params['filter']) && params['filter'] === 'recurringPayment') {
                this.currentWallet = _.find(this._shared.wallet, { isScheduled: true }) as Wallet;
                this.filterScheduled = 'Recurring';
            }
        });
    }
    getTransactions() {
        let transactions;
        switch (this.filterType) {
            case 'Received':
                transactions = this._shared.wallet[this.walletIndex].transactions.filter((transaction: any) => transaction.direction == 'Received');
                break;
            case 'Paid':
                transactions = this._shared.wallet[this.walletIndex].transactions.filter((transaction: any) => transaction.direction == 'Sent');
                break;
            case 'Awaiting':
                transactions = this._shared.wallet[this.walletIndex].transactions.filter((transaction: any) => transaction.isPending == true);
                break;
            default:
                transactions = this._shared.wallet[this.walletIndex].transactions;
                break;
        }
        return transactions;
    }
    async getScheduled() {
        const urlApi = 'api/ScheduledPayments/GetScheduledList';
        await this._shared.get(urlApi)
            .then(data => this.scheduledList = data.data);
    }
    async cancelScheduled(scheduledPaymentsID: number) {
        try {
            this._spinner.showSpinner();
            $('.page-wrapper').animate({ scrollTop: 0 }, 500);
            const urlApi = 'api/ScheduledPayments/CancelScheduled';
            const body = {
                "scheduledPaymentsID": scheduledPaymentsID
            };
            this.response = await this._shared.post(urlApi, body);
            this._spinner.hideSpinner();
        } catch (error) {
        } finally {
            await this.getScheduled();
        }
    }
    async getRecurring() {
        const urlApi = 'api/ScheduledPayments/GetRecurring';
        await this._shared.get(urlApi)
            .then(data => this.recurringList = data.data);
    }
    async cancelRecurring(id: number) {
        try {
            const urlApi = 'api/ScheduledPayments/CancelRecurring';
            const body = { "id": id };
            this.response = await this._shared.post(urlApi, body);
        } catch (error) {
            console.log(error);
        } finally {
            await this.getRecurring();
        }
    }
    toggleTransaction(index: number) {
        if (this._toggleTransaction === index) {
            this._toggleTransaction = -1;
            return;
        }
        this._toggleTransaction = index;
        return;
    }
    toggleViewer(event: any) {
        event.target.classList.toggle("active");
        event.target.parentNode.nextElementSibling.classList.toggle("active");
    }
    toggleCancelScheduled(event: any) {
        event.target.parentNode.nextElementSibling.classList.toggle("active");
    }
    clearResponse() {
        this.response = null;
    }
    get getScheduledList() {
        let arr = _.orderBy(_.filter(this.scheduledList, { fromAddress: this.currentWallet.address }), 'createDate', 'desc');
        let newArr = _.orderBy(_.filter(arr, (obj: any) => obj.status === 'Created'), 'dateShipped', 'asc')
        return newArr.concat(_.filter(arr, (obj: any) => obj.status !== 'Created'));
    }
    get getRecurringList() {
        let arr = _.orderBy(_.filter(this.recurringList, { fromAddress: this.currentWallet.address }), 'createDate', 'desc');
        let newArr = _.orderBy(_.filter(arr, (obj: any) => obj.status === 'Created'), 'dateShipped', 'asc')
        return newArr.concat(_.filter(arr, (obj: any) => obj.status !== 'Created'));
    }
}