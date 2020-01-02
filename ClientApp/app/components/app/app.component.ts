import { SharedService } from '../../services/shared-service.service';
import { Component, Inject } from '@angular/core';
import { WalletService } from "../../services/wallet.service";
import { UserService } from "../../services/user.service";
import { Location } from '@angular/common';
import { TranslateService } from 'ng2-translate';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { TopMenuService } from '../../services/topmenu.service';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [WalletService, UserService]
})

export class AppComponent {
    constructor(
        @Inject('BASE_URL') public baseUrl: string,
        public _wallet: WalletService,
        public _shared: SharedService,
        public _location: Location,
        public _translate: TranslateService,
        private router: Router,
        private route: ActivatedRoute,
        private _topMenu: TopMenuService
    ) {
        const langs = [
            'en', 'ch', 'de',
            'ee', 'en', 'es', 'fr',
            'hu', 'id', 'it', 'ja',
            'ko', 'lt', 'pl', 'pt-pt',
            'ru', 'se', 'sk',
            'th', 'tr', 'vn'
        ];
        _translate.addLangs(langs);
        try {
            const localStorageUserLang = window.localStorage.getItem('userLang');
            const queryParamLang = new URLSearchParams(window.location.search).get('lang');
            if (localStorageUserLang !== null) {
                _translate.use(`${localStorageUserLang}`);
            } else if (queryParamLang && langs.includes(queryParamLang)) {
                window.localStorage.setItem('userLang', queryParamLang);
                _translate.use(`${queryParamLang}`);
            } else {
                _translate.setDefaultLang('en');
            }
        } catch (e) {
            console.log(`Error: ${e}`);
        }

        this.router.events
            .filter(e => e instanceof NavigationEnd)
            .pairwise().subscribe((e) => {
                _topMenu._showNavbar = false;
            });
    }

    backClicked() {
        this._location.back();
    }
}