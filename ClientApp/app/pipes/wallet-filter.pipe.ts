import { Pipe, PipeTransform } from "@angular/core";
import * as _ from 'lodash';
import { Wallet } from "../models/data/walletv2.data.model";
import { Util } from "../models/util";


@Pipe({
    name: 'WalletFilterPipe'
})
export class WalletFilterPipe implements PipeTransform {
    transform(wallets: Wallet[], address: string) {
        if (!Util.isValidAndNotEmpty(address)) return wallets;

        let filterBy = address.toLocaleLowerCase();

        if (!Util.isValidAndNotEmpty(filterBy)) return wallets;

        let w = wallets.filter((wallet: Wallet) =>
            wallet.address.toLocaleLowerCase().indexOf(filterBy) !== -1);

        return w;
    }
}