import { Component, EventEmitter, Output } from '@angular/core';
import { SharedService } from '../../../services/shared-service.service';
import { Wallet } from '../../../models/data/walletv2.data.model';

@Component({
    selector: 'smartvault-button',
    styleUrls: ['./smartvaultbutton.component.css'],
    template: `
        <button type="button" class="btn btn-action" (click)="sendAddress(vaultWallet.address)" *ngIf="vaultWallet">
            <i class="icon-vault"></i>
        </button>
    `
})

export class SmartVaultButtonComponent {
    @Output() onSelected: EventEmitter<any> = new EventEmitter();

    constructor(private _shared: SharedService) { }

    get vaultWallet() {
        return this._shared.wallet.find((wallet: Wallet) => wallet.isVault);
    }

    sendAddress(vaultWalletAddress: string): void {
        this.onSelected.emit(vaultWalletAddress);
    }
}