import { Injectable, Inject } from "@angular/core";
import { SharedService } from "./shared-service.service";
import { Wallet } from "../models/data/walletv2.data.model";

import * as smartCash from 'smartcashjs-lib/src';
import * as _ from 'lodash';
import * as aes256 from 'aes256';

@Injectable()
export class WalletService {

    constructor(
        protected _shared: SharedService,
        @Inject('BASE_URL') public baseUrl: string
    ) {
    }

    async sendPayment(transaction: any): Promise<any> {

        let wallet = this._shared.dataStore.wallet.find((w: Wallet) => w.address === transaction.FromAddress);

        let privateKey: string = "";

        if (_.isUndefined(wallet) || _.isNull(wallet) || _.isEmpty(wallet))
            throw Error("You need a private key in order to send it");
        else {
            privateKey = aes256.decrypt(transaction.UserKey, wallet.key);
        }

        if (_.isEmpty(privateKey))
            throw Error("You need a private key in order to send it");

        return this.createAndSendRawTransaction(transaction.ToAddress, transaction.Amount, privateKey!);
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


    //SAPI

    async createAndSendRawTransaction(toAddress: string, amount: number, keyString: string) {

        let satoshi = 100000000;

        let amountSat = satoshi * amount;

        let key = smartCash.ECPair.fromWIF(keyString);

        let fromAddress = key.getAddress().toString();

        let transaction = new smartCash.TransactionBuilder();

        let sapiUnspent = await this.getUnspent(fromAddress, amount);

        transaction.setLockTime(sapiUnspent.blockHeight);
        //SEND TO
        transaction.addOutput(toAddress, amountSat);

        //Change TO
        transaction.addOutput(fromAddress, this.roundUp(sapiUnspent.change * satoshi, 4));

        //Add unspent and sign them all
        if (!_.isUndefined(sapiUnspent.utxos) && sapiUnspent.utxos.length > 0) {

            sapiUnspent.utxos.forEach((element: any) => {
                transaction.addInput(element.txid, element.index);
            });

            const totalUnspent = sapiUnspent.utxos.length;

            for (let i = 0; i < totalUnspent; i += 1) {
                transaction.sign(i, key);
            }
        }

        try {
            let signedTransaction = transaction.build().toHex();
            return await this.sendTransaction(signedTransaction);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }


    round(number: number, decimals: number): number {

        return Math.round(
      
          parseFloat(number.toString()) * Math.pow(10, decimals),
      
        ) / Math.pow(10, decimals);
      
      }
      
      
    roundUp(num: number, precision: number) {
        precision = Math.pow(10, precision)
        return Math.ceil(num * precision) / precision
    }

    async getUnspent(address: string, amount: number) {
        try {
            return await this._shared.post("api/Wallet/GetUnpents", {
                "address": address,
                "amount": amount,
                "random": true,
                "instantpay": false
            });
        } catch (err) {
            throw err;
        }
    }

    async sendTransaction(hex: string) {
        try {
            return await this._shared.post("api/Wallet/BroadcastTransaction", {
                data: `${hex}`,
                instantpay: false,
                overrideFees: false
            });
        } catch (err) {
            throw err;
        }
    }
}