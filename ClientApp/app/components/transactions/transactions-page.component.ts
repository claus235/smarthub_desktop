import { Component, Inject, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { SharedService } from '../../services/shared-service.service';

@Component({
    selector: 'transactions-page',
    templateUrl: './transactions-page.component.html'
})
export class TransactionsPageComponent {
    constructor(public _shared: SharedService) { }
}