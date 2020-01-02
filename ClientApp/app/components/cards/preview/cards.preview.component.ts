import { Component, Inject } from '@angular/core';
import { SharedService } from '../../../services/shared-service.service';
import { CardService } from '../../../services/card.service';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
    selector: 'app-cards-preview',
    templateUrl: './cards.preview.component.html'
})

export class CardsPreviewComponent {
    public qrCode: any;
    public userKey: string;
    public response: any;
    public inProgress: boolean = false;

    constructor(
        public _shared: SharedService,
        public _card: CardService,
        @Inject(DOCUMENT) private document: any
    ) { }

    async getQrCode() {
        try {
            this.inProgress = true;
            const url = 'api/card/qrcode';
            const body = {
                "address": this._card.cardInfo.address,
                "userKey": this.userKey
            };
            this.qrCode = await this._shared.post(url, body);
        } catch (error) {
            console.log(error);
        } finally {
            this.inProgress = false;
        }
    }

    toggleList(_e: MouseEvent) {
        const container = this.document.querySelector('.card-preview ul.list');
        document.addEventListener('mouseup', (e) => {
            if (e.target !== _e.target) {
                container.classList.remove('active');
            }
        });
        container.classList.toggle('active');
    }

    async deleteCard() {
        try {
            const url = `api/card/delete/${this._card.currentWallet.cardId}`;
            this.response = await this._shared.delete(url);
            if (this.response.isValid) {
                this._card.cardDeleted = this.response.data;
                this._card.cardInfo = null!;
                this._card.currentWallet.cardId = null!;
            }
        } catch (error) {
            console.log('Error:', error)
        }
    }

    toggleDelete() {
        this.document.querySelector('.card-delete').classList.toggle('active');
    }

    toggleTransaction(event: any) {
        event.target.parentNode.parentNode.parentNode.parentNode.classList.toggle("active");
    }
}