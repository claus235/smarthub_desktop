import { Component, Inject, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { User } from "../../models/user.model";
import { Util } from "../../models/util";
import { SharedService } from '../../services/shared-service.service';

@Component({
    selector: 'user-info',
    templateUrl: './user-info.component.html'
})
export class UserInfoComponent {
    constructor(public _shared: SharedService, @Inject('BASE_URL') public baseUrl: string) { }
}