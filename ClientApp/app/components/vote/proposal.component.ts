import * as _ from 'lodash';
import { Util } from '../../models/util';
import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { SharedService } from '../../services/shared-service.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { VoteService } from '../../services/vote.service';

@Component({
    selector: 'proposal',
    templateUrl: './proposal.component.html'
})
export class ProposalComponent implements OnInit {
    public filters: string[] = ['Open', 'Funds Allocated', 'Completed', 'Not Funded'];
    public filterType: string = this.filters[0];

    ngOnInit(): void {
        (async () => {
            try {
                if (!Util.isValidObject(this._voteService) || !Util.isValidObject(this._voteService.proposals)) {
                    this._voteService.proposals = (<any>await this._voteService.getProposals()).result;
                }
            } catch (e) {
                console.log(`catch triggered with exception ${e}`);
            }
        })();
    }

    constructor(public _shared: SharedService, private router: Router, public _voteService: VoteService) { }

    getProposals() {
        if (_.isNil(this._voteService.proposals)) {
            return;
        }
        const proposals = this._voteService.proposals.filter((proposal: any) => proposal.status === this.filterType);
        return _.orderBy(proposals, 'createdDate', 'desc');
    }

    getNumber(number: number) {
        if (isNaN(number)) return 0;
        return number;
    }
}