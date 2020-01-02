import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
    name: 'TransactionFilterPipe'
})
export class TransactionFilterPipe implements PipeTransform {
    transform(transactions: any, hash: any) {
        let filterBy = hash.toLocaleLowerCase();
        console.log(`FILTER BY: ${filterBy}`);
        if (filterBy === "") return transactions;
        let tran = transactions.filter((transaction: any) =>
            transaction.hash.toLocaleLowerCase().indexOf(filterBy) !== -1);

        return tran;
    }
}