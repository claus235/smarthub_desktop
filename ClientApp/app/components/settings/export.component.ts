import { Router, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { forEach } from '@angular/router/src/utils/collection';
import { async } from 'rxjs/scheduler/async';
import { WalletService } from '../../services/wallet.service';
import { ExportRequest } from '../../models/request/export-request.model';
import { Component, Inject, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { User } from "../../models/user.model";
import { Util } from "../../models/util";
import { SharedService } from '../../services/shared-service.service';

@Component({
    selector: 'settings-export',
    templateUrl: './export.component.html'
})
export class SettingsExportComponent {
    export: ExportRequest;
    response: any;
    public successMessage = "";
    public errorMessage = "";
    public showForm: boolean = false;

    public exportRequest: any;
    public exportHtml: string;

    _inProgress: boolean = false;

    get inProgress(): boolean {
        return this._inProgress;
    }

    set inProgress(value: boolean) {
        this._inProgress = value;
    }

    constructor(
        public _shared: SharedService,
        public _router: Router,
        public _walletService: WalletService,
        @Inject('BASE_URL') public baseUrl: string) {
        this.export = new ExportRequest;
    }
    async onSubmit() {
        this.inProgress = true;
        try {
            this.response = await this._walletService.exportWallet({
                "userKey": this.export.recoveryKey,
                "code": this.export.code
            });

            if (Util.isValidObject(this.response) && this.response.isValid) {
                this._shared.dataStore.recoveryKey.recoveryKey = this.export.recoveryKey;
                this.exportRequest = await this._shared.exportPrivateKeys(this.response, this._shared.user.username);
                console.log(this.exportRequest);
                this.exportHtml = this.exportRequest.toString();

                while (Util.isValidAndNotEmpty(this.exportHtml) && this.exportHtml.indexOf('\n') > -1) {
                    this.exportHtml = this.exportHtml.replace("\r\n", "<br />");
                }
            }
        } catch (e) {
            console.log(e);
            this.errorMessage = e.message;
        } finally {
            this.inProgress = false;
        }
    }

    showPaperWallet(recoveryKey: string) {
        this._router.navigate(['/paper-wallet'], { queryParams: { dataAddress: JSON.stringify(this.response.data) } });
    }

    download(text: any, name: string, type: string) {
        var a = document.createElement("a");
        var file = new Blob([text], { type: type });
        a.href = URL.createObjectURL(file);
        a.download = name;
        a.click();
    }
}