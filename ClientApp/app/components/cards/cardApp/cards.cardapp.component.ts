import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { SharedService } from '../../../services/shared-service.service';
import { CardService } from '../../../services/card.service';
import { isPlatformBrowser } from '@angular/common';
import { SpinnerService } from '../../../services/spinner.service';

@Component({
    selector: 'app-card-cardapp',
    templateUrl: './cards.cardapp.component.html'
})
export class CardsAppComponent {
    public userKey: string = '';
    public isPlatformBrowser: boolean = false;
    public isAndroid: boolean = false;

    constructor(
        public _shared: SharedService,
        public _card: CardService,
        @Inject(PLATFORM_ID) platformId: Object,
        public _spinner: SpinnerService
    ) {
        if (isPlatformBrowser(platformId)) {
            this.isPlatformBrowser = true;
            this.isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1;
        }
    }

    async getAppleCard() {
        try {
            this._spinner.showSpinner();
            const url = 'api/card/applecard';
            const body = {
                "address": this._card.currentWallet.address,
                "userKey": this.userKey
            };
            await this._shared.postReturnBinary(url, body);
        } catch (error) {
            console.log('Error:', error);
        } finally {
            this._spinner.hideSpinner();
        }
    }

    async getAndroidCard() {
        if (this.isPlatformBrowser && !this.isAndroid) {
            const playStore = 'https://play.google.com/store/apps/details?id=cc.smartcash.smartcard';
            window.open(playStore, '_blank');
            return;
        }
        try {
            this._spinner.showSpinner();
            const url = 'api/card/androidcard';
            const body = {
                "address": this._card.currentWallet.address,
                "userKey": this.userKey
            };
            const response = await this._shared.post(url, body);
            if (this.isPlatformBrowser && this.isAndroid && response.isValid) {
                window.open(response.data, '_blank');
            }
        } catch (error) {
            console.log('Error:', error);
        } finally {
            this._spinner.hideSpinner();
        }
    }
}