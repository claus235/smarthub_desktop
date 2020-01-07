import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate';

@Component({
    selector: 'terms',
    templateUrl: './terms.component.html'
})
export class TermsOfUseComponent {
    
    constructor(private translateService: TranslateService) {}

    get termsText() {
        return this.translateService.instant('termsText');
    }
    
}