import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'donate',
    templateUrl: './donate.component.html'
})
export class DonateComponent implements OnInit {
    user: any;

    constructor(
        public route: ActivatedRoute,
        private _user: UserService
    ) { }

    async ngOnInit() {
        const userParam = this.route.snapshot.paramMap.get('userName');
        const label: string | null = this.route.snapshot.paramMap.get('label') || '';
        if (!userParam)
            return;
        this.user = await this._user.getUserByName(userParam, label);
    }
}