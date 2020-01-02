import { async } from 'rxjs/scheduler/async';
import { Http } from '@angular/http';
import { Injectable, Inject } from "@angular/core";
import { SharedService } from "./shared-service.service";
import { Observable } from "rxjs/Observable";
import * as _ from 'lodash';

@Injectable()
export class VoteService {
    constructor(
        private _http: Http,
        protected _shared: SharedService,
        @Inject('BASE_URL') public baseUrl: string
    ) {
    }

    public proposals: any;

    async getProposalByName(name: string) {
        return _.find(this.proposals, { url: name });
    }

    async getProposals(): Promise<any> {
        return await this._http
            .get(`${this.baseUrl}api/vote/GetProposals`)
            .map((res) => {
                return res.json();
            }).toPromise();
    }
    async getProposal(id: number): Promise<any> {
        return await this._http
            .get(`${this.baseUrl}api/vote/GetProposal?id=${id}`)
            .map((res) => {
                return res.json();
            }).toPromise();
    }
    async sendVote(vote: any) {
        return await this._shared.post(`api/vote/SendVote`, vote);
    }
}