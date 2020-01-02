import { Component, AfterContentInit, PLATFORM_ID, APP_ID, Inject, Input, ElementRef, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as QRCode from 'qrcode';

@Component({
    selector: 'qrcode',
    template: `<canvas></canvas>`
})

export class QRCodeComponent implements AfterContentInit, OnChanges {
    @Input() data: any;

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        @Inject(APP_ID) private appId: string,
        private elementRef: ElementRef
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        if (isPlatformBrowser(this.platformId)) {
            QRCode.toCanvas(this.elementRef.nativeElement.querySelector('canvas'), changes.data.currentValue);
        }
    }

    ngAfterContentInit() {
        if (isPlatformBrowser(this.platformId)) {
            QRCode.toCanvas(this.elementRef.nativeElement.querySelector('canvas'), this.data);
        }
    }
}