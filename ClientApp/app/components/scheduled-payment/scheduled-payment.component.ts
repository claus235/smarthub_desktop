import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared-service.service';
import { DepositScheduledPayment } from './deposit/deposit.component';
import { CreateRecurringPaymentComponent } from './createRecurring/createrecurringpayment.component';
import { CreateScheduledPaymentComponent } from './createScheduled/createscheduledpayment.component';

@Component({
    selector: 'schedulepayment',
    templateUrl: './scheduledpayment.component.html',
    styleUrls: ['./scheduledpayment.component.css'],
    entryComponents: [
        DepositScheduledPayment,
        CreateRecurringPaymentComponent,
        CreateScheduledPaymentComponent
    ]
})

export class ScheduledPaymentComponent implements OnInit {
    public configuringScheduledPayment = false;
    public component: any = null;

    constructor(public _shared: SharedService) { }

    ngOnInit(): void { }

    get wallet() {
        return this._shared.wallet.find(wallet => wallet.isScheduled);
    }

    get inputs() {
        return {
            wallet: this.wallet
        }
    };

    showDeposit() {
        this.component = DepositScheduledPayment;
    }

    showCreateScheduled() {
        this.component = CreateScheduledPaymentComponent;
    }

    showCreateRecurring() {
        this.component = CreateRecurringPaymentComponent;
    }
}