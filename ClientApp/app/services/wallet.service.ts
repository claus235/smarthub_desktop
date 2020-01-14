import { Injectable, Inject } from "@angular/core";
import { SharedService } from "./shared-service.service";
import { Wallet } from "../models/data/walletv2.data.model";

const smartCash = require('smartcashjs-lib');
import * as _ from 'lodash';
import { Http } from "@angular/http";
import { add } from "ngx-bootstrap/chronos";

@Injectable()
export class WalletService {

    constructor(
        private _http: Http,
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
            privateKey = wallet.key;
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


        /*
        {
            "blockHeight": 1414485,
            "scriptPubKey": "76a91424634fdb4cc2886ac971c91fe4505048d598012d88ac",
            "address": "SQcQL4ZmXZsgcFQoLs6qRQ2psB27BwKVdA",
            "requestedAmount": 0.1,
            "finalAmount": 1.488,
            "fee": 0.001,
            "change": 1.387,
            "utxos": [
                {
                "txid": "79c890cd87db58cd2d8ac156fc9dc8b2ca574e37ebf07755a8a1a8fa5d7ab1c3",
                "index": 1,
                "confirmations": 275,
                "amount": 1.488
                }
            ]
            }
        */

        let totalUnspent = sapiUnspent.finalAmount;

        console.log(`Total Unspent ${totalUnspent}`);

        let fee = sapiUnspent.fee;

        console.log(`Fee ${fee}`)

        //SEND TO
        transaction.addOutput(toAddress, amountSat);

        //Change TO
        transaction.addOutput(fromAddress, this.roundUp(sapiUnspent.change * satoshi, 4));

        let bigInputs = _.first(sapiUnspent.utxos);

        console.log(`bigInputs ${JSON.stringify(bigInputs)}`)

        let uxto = null;

        if (!_.isUndefined(bigInputs) && _.isArray(bigInputs)) {

            uxto = _.first(bigInputs);

            console.log(`uxto ${JSON.stringify(uxto)}`);
        } else {
            if (!_.isUndefined(bigInputs)) {
                uxto = bigInputs;
                console.log(`uxto ${JSON.stringify(uxto)}`);
            }
        }

        transaction.addInput(uxto.txid, uxto.index);

        try {
            transaction.sign(0, key);

            let signedTransaction = transaction.build().toHex();

            console.log(signedTransaction)

            let txid = await this.sendTransaction(signedTransaction)

            console.log(txid)

            return txid;

        } catch (err) {
            console.error(err);
            throw err;
        }
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