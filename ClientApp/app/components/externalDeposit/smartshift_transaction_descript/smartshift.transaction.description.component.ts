import { Component, Input, Output, ElementRef, EventEmitter } from '@angular/core';

@Component({
    selector: 'smartshift-transaction-description',
    templateUrl: 'smartshift.transaction.description.component.html'
})

export class SmartShiftTransactionDescription {
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
}