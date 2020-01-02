import { Component, Inject } from '@angular/core';
import { SharedService } from '../../services/shared-service.service';
import { TopMenuService } from '../../services/topmenu.service';

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html'
})
export class NavMenuComponent {
    constructor(
        @Inject('BASE_URL') public baseUrl: string,
        protected _shared: SharedService,
        public _topmenu: TopMenuService
    ) { }
}