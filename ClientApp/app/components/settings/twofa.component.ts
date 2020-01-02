import { WalletService } from '../../services/wallet.service';
import { TwoFaRequest } from '../../models/request/twofa.model';
import { Component, Inject, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { User } from "../../models/user.model";
import { Util } from "../../models/util";
import { SharedService } from '../../services/shared-service.service';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'settings-twofa',
    templateUrl: './twofa.component.html'
})
export class TwoFaComponent {
    response: any;
    response2: any;
    response3: any;
    response4: any;
    public successMessage = "";
    public errorMessage = "";
    public twofa: TwoFaRequest = new TwoFaRequest;
    public openFormTwoFa: boolean = false;
    public showForm: boolean = false;
    public showFormRequire2faToSend = false;

    _inProgress: boolean = false;

    get inProgress(): boolean {
        return this._inProgress;
    }

    set inProgress(value: boolean) {
        this._inProgress = value;
    }

    constructor(
        @Inject('BASE_URL') public baseUrl: string, public _user: UserService, public _shared: SharedService) {
    }

    async enableTwoFa() {
        this.inProgress = true;
        this.response = undefined;
        this.response2 = undefined;
        this.response3 = undefined;
        this.response4 = undefined;
        this.openFormTwoFa = false;

        try {
            this.response2 = await this._user.enableTwoFa(this.twofa);
            if (this.response2.isValid) {
                this._shared.dataStore.user.is2FAEnabled = true;
                this.twofa = new TwoFaRequest;
                this.openFormTwoFa = false;
            }
        } catch (e) {
            console.log(e);
            this.errorMessage = e.message;
        } finally {
            this.inProgress = false;
        }
    }

    _showFormRequire2faToSend() {
        this.showFormRequire2faToSend = true;
        this.response4 = undefined;
    }

    async toggleRequire2faToSend() {
        try {
            this.response4 = undefined;
            const body = {
                code: this.twofa.data,
                require2faToSend: !this._shared.dataStore.user.require2faToSend
            }
            this.response4 = await this._user.require2faToSend(body);
            if (this.response4.isValid) {
                this._shared.dataStore.user.require2faToSend = !this._shared.dataStore.user.require2faToSend;
                this.twofa = new TwoFaRequest;
                this.showFormRequire2faToSend = false;
            }
        } catch (e) {
            console.log(e);
            this.errorMessage = e.message;
        } finally {
            this.inProgress = false;
        }
    }

    async disableTwoFa() {
        this.inProgress = true;

        this.response = undefined;
        this.response2 = undefined;
        this.response3 = undefined;
        this.response4 = undefined;
        this.openFormTwoFa = true;

        try {
            this.response3 = await this._user.disableTwoFa(this.twofa);
            if (this.response3.isValid) {
                this._shared.dataStore.user.is2FAEnabled = false;
                this.twofa = new TwoFaRequest;
                this.openFormTwoFa = false;
            }
        } catch (e) {
            console.log(e);
            this.errorMessage = e.message;
        } finally {
            this.inProgress = false;
        }
    }

    async getNewTwoFa() {
        this.inProgress = true;
        this.response = undefined;
        this.response2 = undefined;
        this.response3 = undefined;
        this.response4 = undefined;
        this.openFormTwoFa = false;
        try {
            this.response = await this._user.getNewTwoFa();
        } catch (e) {
            console.log(e);
            this.errorMessage = e.message;
        } finally {
            this.inProgress = false;
        }
    }

    async openFormDisableTwoFa() {
        this.openFormTwoFa = true;
        this.response = undefined;
        this.response2 = undefined;
        this.response3 = undefined;
        this.response4 = undefined;
    }
}