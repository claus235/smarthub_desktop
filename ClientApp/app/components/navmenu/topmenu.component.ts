import { Router } from '@angular/router';
import { Component, Inject, OnInit, Input } from '@angular/core';
import { WalletService } from "../../services/wallet.service";
import { Util } from "../../models/util";
import { SharedService } from '../../services/shared-service.service';
import { environment } from '../../app.environment';
import { DeviceDetectorService } from '../../modules/ngx-device-detector/device-detector.service';
import { TranslateService } from 'ng2-translate';
import { TopMenuService } from '../../services/topmenu.service';

@Component({
    selector: 'top-menu',
    templateUrl: './topmenu.component.html'
})
export class TopMenuComponent implements OnInit {
    public tx = { id: '' };
    public isNative = false;
    public isMobile = false;

    constructor(
        @Inject('BASE_URL') public baseUrl: string,
        private _router: Router,
        public _shared: SharedService,
        public _device: DeviceDetectorService,
        public _translate: TranslateService,
        public _topmenu: TopMenuService
    ) {
        //console.log(this._shared.isProductionEnvironment);
    }

    logOut() {
        this._shared.logout();
        this._router.navigate(['/login']);
    }
    public ngOnInit(): void {
        this.isNative = (/AppName\/[0-9\.]+$/.test((<any>navigator).userAgent));
        this.isMobile = /iPhone|iPad|iPod|Android/i.test((<any>navigator).userAgent);
    }

    searchTransaction() {
        this._router.navigate(['/transactions/', this.tx.id]);
    }

    changeLanguage(lang: string) {
        window.localStorage.setItem('userLang', lang);
        // Force reload is more fast than use _translate.use(lang);
        window.location.reload();
    }
}