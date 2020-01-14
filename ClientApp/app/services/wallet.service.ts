import { Injectable, Inject } from "@angular/core";
import { SharedService } from "./shared-service.service";
import { Wallet } from "../models/data/walletv2.data.model";

const smartCash = require('smartcashjs-lib');
import * as _ from 'lodash';
import { Http } from "@angular/http";

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

        let tx = await this.createAndSendRawTransaction(transaction.ToAddress, transaction.Amount, privateKey!);

        console.log(tx);

        return tx;
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

        let listUnspent = await this.getUnspent(fromAddress);

        let totalUnspent = _.sumBy(listUnspent, 'amount');

        console.log(`Total Unspent ${totalUnspent}`)

        let fee = this.calculateFee(listUnspent);

        console.log(`Fee ${fee}`)

        let countUnspent = listUnspent.length;

        console.log(`Count Unspent ${countUnspent}`)
        //SEND TO
        transaction.addOutput(toAddress, amountSat);

        let amountWithFee = amount + fee;

        let change = (totalUnspent - amountWithFee);

        console.log(`change ${change}`)

        console.log(`amountWithFee ${amountWithFee}`)

        //Change TO
        transaction.addOutput(fromAddress, this.roundUp(change * satoshi, 4));

        /*
           const data = Buffer.from('Programmable money FTW!', 'utf8')
           const embed = smartCash.payments.embed({data: [data]});
           let data = new Buffer("smartPay");
           let ret = smartCash.script.compile(
               [
                   smartCash.opcodes.OP_RETURN,
                   data
               ])
       
           transaction.addOutput(ret, 0)
       
           */

        let bigInputs = _.find(listUnspent, (o: any) => o.amount >= amountWithFee);

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

        transaction.addInput(uxto.txid, uxto.vout);

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

    calculateFee(listUnspent: any) {

        let fee = 0.002;

        let countUnspent = listUnspent.length;

        var newFee = (((countUnspent * 148) + (2 * 34) + 10 + 9) / 1024) * fee;

        newFee = (0.00003 + (((countUnspent * 148) + (2 * 34) + 10 + 9) / 1024)) * fee;

        if (newFee > fee)
            fee = newFee;

        return this.roundUp(fee, 4);
    }

    roundUp(num: number, precision: number) {
        precision = Math.pow(10, precision)
        return Math.ceil(num * precision) / precision
    }

    async getUnspent(address: string) {
        let url = `https://insight.smartcash.cc/api/addr/${address}/utxo`;
        try {
            return await
                this._http
                    .get(url)
                    .map((res: any) => {
                        return res.json();
                    }).toPromise();
        } catch (err) {
            throw err;
        }

        //TODO: Replace to SAPI and Server Call to avoid cross browser
        //curl -X POST "http://sapi.dustinface.me/v1/address/unspent/amount" -H  "accept: */*" -H  "Content-Type: application/json" -d "{\"address\":\"SQcQL4ZmXZsgcFQoLs6qRQ2psB27BwKVdA\",\"amount\":0.1,\"random\":true,\"instantpay\":true}"
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
    }

    async sendTransaction(hex: string) {

        var options = {
            method: 'POST',
            uri: this.getSAPIUrl() + 'transaction/send',
            body: {
                data: `${hex}`,
                instantpay: false,
                overrideFees: false
            },
            json: true // Automatically stringifies the body to JSON
        };

        try {
            return await
                this._http
                    .post(options.uri, options.body)
                    .map((res: any) => {
                        return res.json();
                    }).toPromise();
        } catch (err) {
            throw err;
        }
    }

    getSAPIUrl(): string {
        let urls = ['http://sapi.dustinface.me/v1/', 'https://sapi2.smartcash.org/v1/', 'https://core-sapi.smartcash.cc/v1/'];
        return urls[Math.floor(Math.random() * (urls.length - 1))];
    }
}