import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
    name: 'creditCard'
})
export class CreditCardMaskPipe implements PipeTransform {
    transform(plainCreditCard: string): string {
        if (plainCreditCard === null || plainCreditCard === '' || plainCreditCard === undefined) {
            return '';
        }
        return plainCreditCard.replace(/\s+/g, '').replace(/(\d{4})/g, '$1 ').trim();
    }
}