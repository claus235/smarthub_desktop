import { Util } from '../../models/util';
import { VoteService } from '../../services/vote.service';
import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { SharedService } from '../../services/shared-service.service';
import { Location } from '@angular/common';

@Component({
    selector: 'proposal-detail',
    templateUrl: './proposal-detail.component.html'
})
export class ProposalDetailComponent implements OnInit {
    vote: any;
    proposal: any;

    constructor(
        public _shared: SharedService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private _voteService: VoteService,
        public location: Location
    ) { }

    public ngOnInit(): void {
        (async () => {
            try {
                if (!Util.isValidObject(this._voteService) || !Util.isValidObject(this._voteService.proposals)) {
                    this._voteService.proposals = (<any>await this._voteService.getProposals()).result;
                }
                let id = this.activatedRoute.snapshot.params["id"];
                this.proposal = await this._voteService.getProposalByName(id);
                this.proposal.summary = this.proposal.summary.replace(/\n/g, '<br />');
                this.proposal.description = this.proposal.description.replace(/\n/g, '<br />');
            } catch (e) {
                console.log(`catch triggered with exception ${e}`);
            }
        })();
    }
}