import { ChangePasswordRequest } from '../../models/request/change-password-request.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { SharedService } from '../../services/shared-service.service';
import { UserService } from '../../services/user.service';
import { WalletService } from '../../services/wallet.service';
import { Util } from '../../models/util';
import { BaseLocalStorageService } from '../../services/base-localstore.service';
import { DeviceDetectorService } from '../../modules/ngx-device-detector/device-detector.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'disabletwofa-recovery',
    templateUrl: './disabletwofa.recovery.component.html'
})

export class DisableTwoFaRecoveryComponent implements OnInit {
    constructor(
        public _shared: SharedService,
        public _router: Router,
        public _user: UserService,
        public _wallet: WalletService,
        private _route: ActivatedRoute,
        @Inject('BASE_URL') public baseUrl: string,
        @Inject(PLATFORM_ID) platformId: Object,
        private _baseStorage: BaseLocalStorageService,
        private _device: DeviceDetectorService
    ) {
        this.userInfo = new ChangePasswordRequest;

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

    public userInfo: ChangePasswordRequest;
    public response: any;
    public formModel = { captcha: undefined, password_confirmation: undefined };
    public _inProgress: boolean = false;
    public isNative = false;
    public isMobile = false;

    get inProgress(): boolean {
        return this._inProgress;
    }
    set inProgress(value: boolean) {
        this._inProgress = value;
    }

    _hasQrCode: boolean = true;
    get hasQrCode(): boolean {
        return this._hasQrCode;
    }
    set hasQrCode(value: boolean) {
        this._hasQrCode = value;
    }

    _isPasswordEqual: boolean = true;
    get isPasswordEqual(): boolean {
        return this._isPasswordEqual;
    }
    set isPasswordEqual(value: boolean) {
        this._isPasswordEqual = value;
    }
    public confirmPassword() {
        this.isPasswordEqual = this.userInfo.password === this.formModel.password_confirmation;
    }

    _inputTypePassword: string = "password";
    get inputTypePassword(): string {
        return this._inputTypePassword;
    }
    set inputTypePassword(value: string) {
        this._inputTypePassword = value;
    }

    showPassword() {
        if (this.inputTypePassword === "password") {
            this.inputTypePassword = "text";
        } else {
            this.inputTypePassword = "password";
        }
    }

    ErrorMessage: string = "";

    async disable2FA() {
        this.inProgress = true;
        try {
            this.response = await this._user.disableTwoFaRecovery(this.userInfo);

            if (Util.isValidObject(this.response) && this.response.isValid) {
                setTimeout((router: Router) => {
                    this._router.navigate(['/login']);
                }, 5000);  //5s
            }
        } catch (e) {
            console.log(e);
        } finally {
            this.inProgress = false;
        }
    }

    public ngOnInit(): void {
        this.isNative = (/AppName\/[0-9\.]+$/.test((<any>navigator).userAgent));
        this.isMobile = /iPhone|iPad|iPod|Android/i.test((<any>navigator).userAgent);
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response ${captchaResponse}:`);
    }

    async startQR() {
        // address is the id of the field that will be filled after a successful scan
        $("#iQR").attr("src", "qr/qrcode/index.html?password");
    }

    async stopQR() {
        $("#iQR").attr("src", "");
    }
}