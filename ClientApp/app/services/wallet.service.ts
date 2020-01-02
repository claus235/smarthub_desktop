import { Injectable, Inject } from "@angular/core";
import { SharedService } from "./shared-service.service";
import { Wallet } from "../models/data/walletv2.data.model";
import { Observable } from "rxjs/Observable";

@Injectable()
export class WalletService {
    constructor(
        protected _shared: SharedService,
        @Inject('BASE_URL') public baseUrl: string
    ) {
    }

    async sendPayment(transaction: any): Promise<any> {
        return await this._shared.post("api/Wallet/SendPayment", transaction);
    }

    async getPaymentFee(transaction: any): Promise<any> {
        return await this._shared.post("api/Wallet/GetPaymentFee", transaction);
    }

    async importWallet(transaction: any): Promise<any> {
        return await this._shared.post("api/Wallet/ImportWallet", transaction);
    }

    async exportWallet(transaction: any): Promise<any> {
        return await this._shared.post("api/Wallet/ExportWallet", transaction);
    }

    async getWallet() {
        return await this._shared.get(`api/Wallet/Get`)

            .then(response => {
                
                
                this._shared.dataStore.wallet = Wallet.map(response.data);

                
                
                return this._shared.dataStore.wallet;
            }
            )
            .catch(function (e) {
                console.log(e);
            });
    }
}