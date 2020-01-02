import { Util } from '../models/util';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SharedService } from './shared-service.service';
import { BaseLocalStorageService } from './base-localstore.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private _shared: SharedService,
        @Inject('BASE_URL') public baseUrl: string,
        private router: Router,
        private _baseStorage: BaseLocalStorageService

    ) { }

    public getClientTokenCacheName = `${this.baseUrl}api/Login/GetClientToken`;

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let item = this._baseStorage.getItemWithoutTime(this.getClientTokenCacheName);

        this._shared.dataStore.isAuthenticated = (Util.isValidObject(item) && Util.isValidObject(item.access_token));

        if (this._shared.isAuthenticated && this._shared.dataStore.wallet.length > 0) {
            return true;
        }
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}