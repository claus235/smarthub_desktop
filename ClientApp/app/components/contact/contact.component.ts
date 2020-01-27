import { Http } from '@angular/http';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DeviceDetectorService } from '../../modules/ngx-device-detector/device-detector.service';
import { ContactResponse } from '../../models/response/contact-response.model';
import { ContactRequest } from '../../models/request/contact-request.model';
import { SharedService } from '../../services/shared-service.service';
import { Util } from '../../models/util';
import { UserService } from '../../services/user.service';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../app.environment';

import * as _ from 'lodash';
import * as $ from 'jquery';

@Component({
    selector: 'contact',
    templateUrl: './contact.component.html'
})

export class ContactComponent implements OnInit {
    public successMessage = "";
    public errorMessage = "";
    public action: any = "A";
    public openForm: boolean = false;
    public _ = _;
    public _toggleContact: number = -1;
    public _env = environment;

    //Request
    public contactRequest: ContactRequest = new ContactRequest;

    //Response
    public response: any;

    public contacts: any;

    _inProgress: boolean = false;
    get inProgress(): boolean {
        return this._inProgress;
    }

    set inProgress(value: boolean) {
        this._inProgress = value;
    }

    onSubmit() {
        this.inProgress = true;
        try {
            if (_.isEmpty(this.contactRequest.name) || _.isEmpty(this.contactRequest.address.trim())) {
                return;
            }
            if (this.action === 'A') {
                this.saveContact();
            } else if (this.action === 'U') {
                this.saveContact();
            } else if (this.action === 'D') {
                if (confirm('Are you sure you want to delete this contact?'))
                    this.deleteContact();
            }
        } catch (e) {
            console.log(e);
        }
        finally {
            this.inProgress = false;
        }
    }

    _hasQrCode: boolean = true;
    get hasQrCode(): boolean {
        return this._hasQrCode;
    }

    set hasQrCode(value: boolean) {
        this._hasQrCode = value;
    }

    constructor(public _shared: SharedService, private _router: Router,
        private route: ActivatedRoute, private _device: DeviceDetectorService,
        private _user: UserService,
        @Inject(PLATFORM_ID) platformId: Object) {
        // Hide qr on lame browsers
        let isPWA;
        if (isPlatformBrowser(platformId)) {
            isPWA = window.matchMedia('(display-mode: standalone)').matches;
        }
        let browser = _device.getDeviceInfo().browser;
        let lameBrowsers = ['safari'];
        if (lameBrowsers.indexOf(browser) > -1 && isPWA) {
            this.hasQrCode = false;
        }
    }

    async decodedOutput(event: any) {
        $('#myModal').removeClass("show");
        $('#myModal').hide();
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    }

    async getContacts() {
        this.inProgress = true;
        try {
            this.contacts = await this._shared.get('api/Contact/Get').then(response => {
                return ContactResponse.map(response.data);
            }).catch(function (e) {
                console.log(e);
            });
        } catch (e) {
            console.log(e);
            this.errorMessage = e.message;
        } finally {
            this.inProgress = false;
        }
    }

    async saveContact() {
        this.inProgress = true;
        this.openForm = true;
        try {
            this.response = await this._shared.post("api/Contact/Save", this.contactRequest);

            if (Util.isValidObject(this.response) && this.response.isValid && this.response.status === "OK") {
                await this.getContacts();
                this.contactRequest = new ContactRequest;
            } else if (!this.response.isValid) {
                this.errorMessage = this.response.error;
            }
        } catch (e) {
            console.log(e);
            this.errorMessage = e.message;
        } finally {
            this.inProgress = false;
            this.openForm = false;
        }
    }

    setAdd() {
        this.action = 'A';
        this.openForm = true;
        this.contactRequest = new ContactRequest;
        this.response = undefined;
        this.successMessage = "";
        this.errorMessage = "";
        this.inProgress = false;
    }
    cancelAdd() {
        this.action = 'A';
        this.openForm = false;
        this.contactRequest = new ContactRequest;
        this.response = undefined;
        this.successMessage = "";
        this.errorMessage = "";
        this.inProgress = false;
    }

    setEdit(contact: any) {
        this.action = 'U';
        this.openForm = true;
        this.contactRequest = contact;
        this.response = undefined;
        this.successMessage = "";
        this.errorMessage = "";
    }

    setDelete(contact: any) {
        this.action = 'D';
        this.openForm = false;
        this.contactRequest = contact;
        this.response = undefined;
        this.successMessage = "";
        this.errorMessage = "";
        this.onSubmit();
    }

    async deleteContact() {
        this.inProgress = true;
        try {
            this.response = await this._shared.delete("api/Contact/Delete/?contactId=" + this.contactRequest.contactId);

            if (Util.isValidObject(this.response) && this.response.isValid && this.response.status === "OK") {
                await this.getContacts();
                this.contactRequest = new ContactRequest;
            }
        } catch (e) {
            console.log(e);
            this.errorMessage = e.message;
        } finally {
            this.inProgress = false;
        }
    }

    private timer: any;
    ngOnInit(): void {
        this.getContacts();

        // Hide qr on lame browsers
        let browser = this._device.getDeviceInfo().browser;
        let lameBrowsers = ['safari'];
        if (lameBrowsers.indexOf(browser) > -1) {
            this.hasQrCode = false;
        }

        this.timer = setInterval(() => {
            let fieldValue = $("#address").val();
            if (Util.isValidAndNotEmpty(fieldValue) && this.contactRequest.address !== fieldValue) {
                this.contactRequest.address = fieldValue!.toString();
            }
        }, 500);
    }

    async startQR() {
        // address is the id of the field that will be filled after a successful scan
        $("#iQR").attr("src", "qr/qrcode/index.html?address");
    }

    async stopQR() {
        $("#iQR").attr("src", "");
    }

    toggleContact(index: number) {
        if (this._toggleContact === index) {
            this._toggleContact = -1;
            return;
        }
        this._toggleContact = index;
        return;
    }
}