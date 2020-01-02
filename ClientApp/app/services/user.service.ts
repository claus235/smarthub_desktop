import { Util } from '../models/util';
import { TokenRequest } from '../models/request/token-request.model';
import { TokenResponse } from '../models/response/token-response.model';
import { RecoveryKey } from '../models/response/key-response.model';

import { async } from 'rxjs/scheduler/async';
import { UserRequest } from '../models/request/user.request.model';
import { SharedService } from './shared-service.service';
import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { User } from "../models/user.model";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Wallet } from '../models/data/walletv2.data.model';
import { GeoIpLookUp } from '../models/response/geoiplookup';

@Injectable()
export class UserService {
    public getClientTokenCacheName = `${this.baseUrl}api/Login/GetClientToken`;
    public geoIpLookup: any;

    constructor(
        protected _shared: SharedService,
        @Inject('BASE_URL') public baseUrl: string,
        protected _http: Http,

    ) {
    }

    async getNewkey() {
        return await this._shared.http.get(`${this.baseUrl}api/User/GetNewKey`)
            .map((response: Response) => { return response.json(); })
            .toPromise()
            .then(response => {
                this._shared.dataStore.recoveryKey = RecoveryKey.map(response.data);
                return this._shared.dataStore.recoveryKey;
            }).catch(function (e) {
                console.log(e);
            });
    }

    async createUser(user: UserRequest) {
        return await
            this._shared.http.post(`${this.baseUrl}api/User/CreateUser`, user)
                .map((response: Response) => { return response.json(); })
                .toPromise()
                .then(response => {
                    this._shared.dataStore.user = User.map(response.data);

                    let r = {
                        "error": response.error,
                        "status": response.status,
                        "isValid": response.isValid,
                        "data": this._shared.dataStore.user
                    };

                    return r;
                }).catch(function (e) {
                    console.log(e);
                });
    }

    async updateUser(user: UserRequest) {
        return await
            this._shared.put(`api/User/UpdateUser`, user)
                .then(response => {
                    this._shared.dataStore.user = User.map(response.data);

                    let r = {
                        "error": response.error,
                        "status": response.status,
                        "isValid": response.isValid,
                        "data": this._shared.dataStore.user
                    };

                    return r;
                }).catch(function (e) {
                    console.log(e);
                });
    }

    async getUserToken(user: TokenRequest) {
        
        

        
        let tokenFromCache = await this._shared.cacheGetWithoutTime(this.getClientTokenCacheName);

        if (Util.isValidObject(tokenFromCache)) {
            let tokenFromCachePromise = await tokenFromCache.toPromise();
            this._shared.dataStore.isAuthenticated = Util.isValidObject(tokenFromCachePromise);

            if (this._shared.dataStore.isAuthenticated) {
                this._shared.dataStore.token = tokenFromCachePromise;
                return this._shared.dataStore.token;
            }
        }
        return await
            this._shared.http.post(this.getClientTokenCacheName, user)
                .map<Response, TokenResponse>((res: Response) => {
                    
                    return TokenResponse.map(res.json());
                })
                .toPromise<TokenResponse>()
                .then(data => {
                    this._shared.dataStore.token = data
                    if (Util.isValidObject(this._shared.dataStore.token) && Util.isValidObject(this._shared.dataStore.token.access_token)) {
                        this._shared.cacheIt(this._shared.dataStore.token, this.getClientTokenCacheName);
                    }

                    return this._shared.dataStore.token;
                })
                .catch(function (e) {
                    console.log(e);
                });
    }
    async getUser() {
        return await this._shared.get(`api/User/Get`)
            .then(response => {
                this._shared.dataStore.user = User.map(response.data);
                this._shared.dataStore.wallet = Wallet.map(response.data.wallet);
                return this._shared.dataStore.user;
            }).catch(function (e) {
                console.log(e);
            });
    }
    async getNewTwoFa() {
        return await this._shared.get(`api/User/GetNewTwoFa`)
            .then(response => {
                return response;
            }).catch(function (e) {
                console.log(e);
            });
    }
    async enableTwoFa(data: any) {
        return await this._shared.post(`api/User/EnableTwoFa`, data)
            .then(response => {
                return response;
            }).catch(function (e) {
                console.log(e);
            });
    }
    async disableTwoFa(data: any) {
        return await this._shared.post(`api/User/DisableTwoFa`, data)
            .then(response => {
                return response;
            }).catch(function (e) {
                console.log(e);
            });
    }

    async disableTwoFaRecovery(data: any) {
        return await this._shared.post2('api/User/DisableTwoFaRecovery', data, false)
            .then(response => response)
            .catch(e => console.log(e));
    }

    async changePassword(data: any) {
        return await this._shared.post2(`api/User/PasswordReset`, data, false)
            .then(response => {
                return response;
            }).catch(function (e) {
                console.log(e);
            });
    }
    async getUserByName(username: string, label: string | null): Promise<any> {
        let url: string = `${this.baseUrl}api/User/GetUserByName?username=${username}`;
        if (label) {
            url += `&label=${label}`;
        }
        return await this._http
            .get(url)
            .map((res: any) => {
                return res.json();
            }).toPromise();
    }

    async require2faToSend(data: any) {
        return await this._shared.post(`api/User/Require2faToSend`, data)
            .then(response => {
                return response;
            }).catch(function (e) {
                console.log(e);
            });
    }

    getUserGeoIpLookUp() {
        
        
        
        
        
        
        this.geoIpLookup = {};
    }
}