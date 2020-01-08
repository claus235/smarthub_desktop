import { Component, Inject } from '@angular/core';
import { SharedService } from '../../services/shared-service.service';
import { Wallet } from '../../models/data/walletv2.data.model';
import { WalletRequest } from '../../models/request/wallet-request.model';
import { TopMenuService } from '../../services/topmenu.service';
import { CardService } from '../../services/card.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'overview',
    templateUrl: './overview.component.html'
})
export class OverviewComponent {
    constructor(
        @Inject('BASE_URL') public baseUrl: string,
        public _shared: SharedService,
        public _topmenu: TopMenuService,
        public _card: CardService,
        private router: Router,
        private _user: UserService
    ) { }

    public walletRequest: Wallet;
    public response: any;
    public openForm: boolean = false;
    public oldWalletRequest: Wallet;
    private _inProgress: boolean = false;
    public address_index: number = 0;
    public notifications: any;

    get inProgress(): boolean {
        return this._inProgress;
    }

    set inProgress(value: boolean) {
        this._inProgress = value;
    }

    editLabel(w: Wallet, index?: number) {
        this.address_index = index || 0;
        this.inProgress = false;
        this.response = undefined;
        this.openForm = true;
        this.walletRequest = Object.assign({}, w);
    }

    cancelEdit() {
        this.inProgress = false;
        this.response = undefined;
        this.openForm = false;
        this.walletRequest = new Wallet;
    }

    async onSubmit() {
        this.inProgress = true;
        try {
            let request: WalletRequest = new WalletRequest;
            request.displayName = this.walletRequest.displayName;
            request.isRewards = this.walletRequest.isRewards;
            request.walletId = this.walletRequest.walletId;
            this.response = await this._shared.put('api/Wallet/Update', request);
        } catch (e) {
            console.log(e);
        }
        finally {
            this.inProgress = false;
        }
    }

    goToCards(w: Wallet) {
        this._card.currentWallet = w;
        this.router.navigateByUrl('/cards');
    }

    getWallets() {
        return this._shared.wallet;
    }

    async getNotifications() {
        await this._shared.get('api/Notifications/My').then((res: any) => {
            const swaloptions = {
                customClass: 'animated fadeInDown',
                showConfirmButton: false,
                allowOutsideClick: false,
                timer: 3000
            };
            if (!res.isValid) {
                const swalError = Object.assign({
                    type: 'warning',
                    text: res.error.message,
                }, swaloptions);
                Swal(swalError);
                return;
            }
            if (res.isValid) {
                this.notifications = res.data;
            }
        });
    }
}