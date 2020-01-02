import { Component, Input, OnInit } from '@angular/core';
import { Wallet } from '../../../models/data/walletv2.data.model';

@Component({
    selector: 'deposit-scheduled-payment',
    styleUrls: ['./deposit.component.css'],
    templateUrl: './deposit.component.html'
})

export class DepositScheduledPayment implements OnInit {
    @Input() wallet: Wallet;

    constructor() { }

    ngOnInit(): void { }
}