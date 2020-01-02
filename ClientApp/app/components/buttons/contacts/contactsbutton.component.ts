import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ContactResponse } from '../../../models/response/contact-response.model';
import { SharedService } from '../../../services/shared-service.service';
import * as _ from 'lodash';
import * as $ from "jquery";

@Component({
    selector: 'contacts-button',
    styleUrls: ['./contactsbutton.component.css'],
    templateUrl: './contactsbutton.component.html'
})

export class ContactsButtonComponent implements OnInit {
    public _ = _;
    public contacts: any;
    public typeSend = 'ADDRESS';
    @Output() onSelected: EventEmitter<any> = new EventEmitter();

    constructor(private _shared: SharedService) { }

    ngOnInit(): void {
        this.getContacts();
    }

    async getContacts() {
        try {
            this.contacts = await this._shared.get('api/Contact/Get').then(response => {
                return ContactResponse.map(response.data);
            }).catch(function (e) {
                console.error(e);
            });;
        } catch (e) {
            console.error(e.message);
        } finally {
        }
    }

    listContacts() {
        let contacts: any;

        switch (this.typeSend) {
            case 'ADDRESS':
                contacts = this.contacts;
                break;
            case 'EMAIL':
                contacts = this.contacts.filter((contact: any) => contact.email !== null);
                break;
            case 'SMS':
                contacts = this.contacts.filter((contact: any) => contact.phone !== null);
                break;
        }

        return contacts;
    }

    hideModal() {
        $('.modal').hide().removeClass('show');
    }
}