import { Component, OnInit, Inject } from '@angular/core';
import { SharedService } from '../../services/shared-service.service';
import { CreateRequest, UpdateRequest, WithDrawRequest, VaultResponse } from './vault';
import { SpinnerService } from '../../services/spinner.service';
import { Wallet } from '../../models/data/walletv2.data.model';
import * as _ from 'lodash';
import * as $ from 'jquery';
import { WalletService } from '../../services/wallet.service';
import { SendRequest } from '../../models/request/send-request.model';
import { Util } from '../../models/util';
import { DOCUMENT } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';

@Component({
    selector: 'app-vault',
    templateUrl: './vault.component.html',
    providers: [DecimalPipe],
})

export class VaultComponent implements OnInit {
    response: any;
    hasSmartVault: boolean = false;
    createSmartVault: boolean = false;
    isWithDraw: boolean = false;
    isUpdate: boolean = false;
    isDeposit: boolean = false;
    createForm: CreateRequest = {} as CreateRequest;
    updateForm: UpdateRequest = {} as UpdateRequest;
    withdrawForm: WithDrawRequest = {} as WithDrawRequest;
    vaultData: VaultResponse = {} as VaultResponse;
    hasEmail: boolean = false;
    selectedSendTo: any;
    _ = _;
    transactionExtended = { fee: 0, amountWithConversion: 0, amountWithFee: 0, exchangeRate: 1.0 };
    transaction: SendRequest = new SendRequest;

    _inputTypePassword: string = "password";
    get inputTypePassword(): string {
        return this._inputTypePassword;
    }
    set inputTypePassword(value: string) {
        this._inputTypePassword = value;
    }

    _hasQrCode: boolean = true;
    get hasQrCode(): boolean {
        return this._hasQrCode;
    }
    set hasQrCode(value: boolean) {
        this._hasQrCode = value;
    }

    showPassword() {
        if (this.inputTypePassword === "password") {
            this.inputTypePassword = "text";
        } else {
            this.inputTypePassword = "password";
        }
    }

    constructor(
        public _shared: SharedService,
        public _spinner: SpinnerService,
        private _wallet: WalletService,
        @Inject(DOCUMENT) public document: any,
        private router: Router,
        private decimalPipe: DecimalPipe
    ) { }

    ngOnInit() {
        this.get();
        this.hasEmail = this.validateEmail(this._shared.user.email);
    }

    validateEmail(email: string) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    async get() {
        try {
            this._spinner.showSpinner();
            const url = 'api/vault/get';
            const response = await this._shared.get(url);

            if (!this.hasEmail || !response || response.error) {
                this.vaultData = null!;
                this.hasSmartVault = false;
                return;
            }

            this.hasSmartVault = response.isValid;
            this.vaultData = response.data;

            this.updateForm = {} as UpdateRequest;
            this.updateForm.maximumValue = response.data.maximumValue;
            this.updateForm.timeForSend = response.data.timeForSend;
        } catch (error) {
            setTimeout(() => this.get(), 400);
        } finally {
            this._spinner.hideSpinner();
        }
    }

    async create() {
        try {
            this._spinner.showSpinner();
            const url = 'api/vault/create';
            this.response = await this._shared.post(url, this.createForm);
            setTimeout(() => window.location.reload(), 4000);
        } catch (error) {
        } finally {
            this._spinner.hideSpinner();
        }
    }

    async update() {
        try {
            this._spinner.showSpinner();
            const url = 'api/vault/update';
            this.updateForm.timeForSend = parseInt(this.updateForm.timeForSend.toString());
            this.response = await this._shared.post(url, this.updateForm);
            if (this.response.isValid) {
                this.get();
            }
            this.goToTop();
        } catch (error) {
        } finally {
            this._spinner.hideSpinner();
        }
    }

    async withdraw() {
        try {
            this._spinner.showSpinner();
            const url = 'api/vault/withdraw';
            this.response = await this._shared.post(url, this.withdrawForm);
            if (this.response.isValid) {
                await this.get();
                $('.page-wrapper').animate({ scrollTop: 0 }, 500);
                setTimeout(() => this.router.navigate(['/transactions'], { queryParams: { filter: 'vaultScheduled' } }), 3000);
            }
            this.goToTop();
        } catch (error) {
        } finally {
            this._spinner.hideSpinner();
        }
    }

    showDeposit() {
        this.isWithDraw = false;
        this.isUpdate = false;
        this.isDeposit = true;
        this.response = null;
    }

    showWithDraw() {
        this.isDeposit = false;
        this.isUpdate = false;
        this.isWithDraw = true;
        this.response = null;
    }

    showSettings() {
        this.isDeposit = false;
        this.isWithDraw = false;
        this.isUpdate = true;
        this.response = null;
    }

    goToTop() {
        $('.page-vault').animate({ scrollTop: 0 }, 500);
    }

    selectWallet(wallet: Wallet) {
        this.withdrawForm.toAddress = wallet.address;
        this.selectedSendTo = wallet;
        $('#modalWallets').removeClass("show");
        $('#modalWallets').hide();
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    }

    startQR() {
        // address is the id of the field that will be filled after a successful scan
        $("#iQR").attr("src", "qr/qrcode/index.html?password");
    }
    stopQR() {
        $("#iQR").attr("src", "");
    }

    getWallets() {
        return this._shared.wallet.filter((wallet: Wallet) => !wallet.isVault && !wallet.isScheduled);
    }

    _hasBalance: boolean = true;
    get hasBalance(): boolean {
        return this._hasBalance;
    }
    set hasBalance(value: boolean) {
        this._hasBalance = value;
    }

    _hasBalanceExceeded: boolean = true;
    get hasBalanceExceeded(): boolean {
        return this._hasBalanceExceeded;
    }
    set hasBalanceExceeded(value: boolean) {
        this._hasBalanceExceeded = value;
    }

    async calculateAmountWithFee(newValue: any) {
        if (!newValue || newValue === '') {
            return;
        }
        await this.getFee();
        this.recalculateAmountWithFee();
    }

    onAmountChange(newValue: any) {
        if (newValue.target.value) {
            newValue.target.value = this.transaction.amount;
        }
        if (newValue.code === "Comma") {
            this.transaction.amount = `${this.transaction.amount}.`;
            newValue.target.value = this.transaction.amount;
        }
    }

    async getFee() {
        const feeObj = { ToAddress: this.withdrawForm.toAddress, Amount: this.withdrawForm.amount };
        let fee = await this._wallet.getPaymentFee(feeObj);
        if (Util.isValidObject(fee))
            this.transactionExtended.fee = fee.data;
        if (_.isNumber(this.transaction.amount * 1))
            this.recalculateAmountWithFee();
    }

    recalculateAmountWithFee() {
        var amountWithConversion = this.withdrawForm.amount / this.transactionExtended.exchangeRate;
        var amountWithFee = (amountWithConversion + this.transactionExtended.fee).toFixed(8);

        this.transactionExtended.amountWithConversion = Number(amountWithConversion);
        this.transactionExtended.amountWithFee = Number(amountWithFee);
        this.hasBalance = this.vaultData.balance >= this.transactionExtended.amountWithFee;
        this.hasBalanceExceeded = 2000000000 >= this.transactionExtended.amountWithFee;
    }

    togglePassword(elementID: string) {
        let type = this.document.querySelector(`#${elementID}`).getAttribute('type') === 'password' ? 'text' : 'password';
        this.document.querySelector(`#${elementID}`).setAttribute('type', type);
    }
}