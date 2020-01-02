import { Component, Input, Output, ElementRef, EventEmitter } from '@angular/core';

@Component({
    selector: 'withdraw-transaction-description',
    styleUrls: ['withdraw.transaction.description.component.css'],
    templateUrl: 'withdraw.transaction.description.component.html'
})

export class WithdrawTransactionDescription {
    public showModalQRCode: boolean = false;
    public transactionProgress: boolean = false;
    public errorMessage: string = '';

    @Input() transaction: any;
    @Output() onCancel: EventEmitter<any> = new EventEmitter();

    constructor(
        private el: ElementRef
    ) {
    }

    toggleDelete() {
        this.el.nativeElement.lastChild.classList.toggle('active')
    }

    deleteTransaction(transactionId: string): void {
        this.onCancel.emit([transactionId]);
    }

    print() {
        window.print();
    }

    qrCodeFull() {
    }
}