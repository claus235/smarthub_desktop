import { Component, OnInit, Inject } from '@angular/core';
import { SpinnerService } from '../../../services/spinner.service';
import { SharedService } from '../../../services/shared-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
    selector: 'vault-withdraw',
    templateUrl: './vault.withdraw.component.html'
})

export class VaultWithdrawComponent implements OnInit {
    withdrawInfo: string;
    userKeyPass: string;
    response: any;
    sendResponseData: any;
    cancelResponseData: any;

    constructor(
        @Inject(DOCUMENT) private document: any,
        public _shared: SharedService,
        public _spinner: SpinnerService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    async ngOnInit() {
        await this.getWithdrawInfo();
    }

    _inputTypePassword: string = "password";
    get inputTypePassword(): string {
        return this._inputTypePassword;
    }
    set inputTypePassword(value: string) {
        this._inputTypePassword = value;
    }
    showPassword() {
        if (this.inputTypePassword === "password") {
            this.inputTypePassword = "text";
        } else {
            this.inputTypePassword = "password";
        }
    }

    async getWithdrawInfo() {
        try {
            this._spinner.showSpinner();
            this.response = await this._shared.get(`api/scheduledpayments/GetScheduled/${this.route.snapshot.params.id}`);
            if (this.response.isValid) {
                this.withdrawInfo = this.response.data;
            }
        } catch (error) {
            console.log(error)
        } finally {
            this._spinner.hideSpinner();
        }
    }

    async cancel() {
        try {
            this._spinner.showSpinner();
            const body = {
                "scheduledPaymentsID": this.route.snapshot.params.id,
                "userKey": this.userKeyPass,
                "tokenConfirmation": this.route.snapshot.params.token
            };
            this.cancelResponseData = { "data": 50, "error": null, "status": "OK", "isValid": true };
            await this.getWithdrawInfo();
            this.response = await this._shared.post(`api/scheduledpayments/cancelmailscheduled`, body);
            if (this.response.isValid) {
                this.cancelResponseData = this.response.data;
                await this.getWithdrawInfo();
            }
        } catch (error) {
            console.log(error)
        } finally {
            this._spinner.hideSpinner();
        }
    }

    async send() {
        try {
            this._spinner.showSpinner();
            const body = {
                "scheduledPaymentsID": this.route.snapshot.params.id,
                "userKey": this.userKeyPass,
                "tokenConfirmation": this.route.snapshot.params.token
            };
            this.response = await this._shared.post(`api/scheduledpayments/send`, body);
            if (this.response.isValid) {
                this.sendResponseData = this.response.data;
                setTimeout(() => this.router.navigateByUrl('/transactions'), 3000);
            }
        } catch (error) {
            console.log(error)
        } finally {
            this._spinner.hideSpinner();
        }
    }

    toggleCancel() {
        this.document.querySelector('.card-delete').classList.toggle('active');
    }
}