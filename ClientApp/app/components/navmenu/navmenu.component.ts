import { Component } from '@angular/core';
import { TopMenuService } from '../../services/topmenu.service';
import { NavMenuList } from './navmenu-list';
import { TranslateService } from 'ng2-translate';

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html'
})
export class NavMenuComponent {

    public navMenuList = NavMenuList;
    
    constructor(
        public _topmenu: TopMenuService, private translateService: TranslateService
    ) {
        
    }

    translate(key: string) {
        return this.translateService.instant(key);
    }

    trackByFn(index: number) {
        return index;
    }

    get showNavbar() {
        return this._topmenu._showNavbar;
    }
}