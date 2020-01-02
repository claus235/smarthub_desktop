import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as $ from 'jquery';
import { DeviceDetectorService } from '../../../modules/ngx-device-detector/device-detector.service';

@Component({
    selector: 'scanbar-button',
    styleUrls: ['./scanbarbutton.component.css'],
    templateUrl: './scanbarbutton.component.html'
})

export class ScanBarButtonComponent {
    @Input() field: string;
    public hasQrCode = true;

    constructor(private _device: DeviceDetectorService, @Inject(PLATFORM_ID) platformId: Object) {
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

    startQR() {
        $('#iQR').attr('src', `qr/qrcode/index.html?${this.field}`);
    }

    stopQR() {
        $('#iQR').attr('src', '');
    }
}