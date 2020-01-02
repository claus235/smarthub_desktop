import { VoteService } from '../../services/vote.service';
import { VoteRequest } from '../../models/request/vote-request.model';
import { SharedService } from '../../services/shared-service.service';
import { Params } from '@angular/router';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Http } from '@angular/http';
import { WalletService } from "../../services/wallet.service";
import { WalletTransaction, Wallet } from "../../models/data/walletv2.data.model";
import { ContactResponse } from '../../models/response/contact-response.model';
import { Util } from '../../models/util';
import * as _ from 'lodash';
import * as $ from 'jquery';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { DeviceDetectorService } from '../../modules/ngx-device-detector/device-detector.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'vote',
    templateUrl: './vote.component.html'
})
export class VoteComponent implements OnInit {
    public sub: any;
    public proposal: any;
    public currentWallet: Wallet;
    public response: any;
    public successMessage = "";
    public errorMessage = "";
    public contacts: any;
    public _ = _;
    public showWallets: boolean = false;
    public currentWalletIndex: number = 0;

    public voteRequest: VoteRequest = new VoteRequest;
    public proposalToVote: any;

    _hasQrCode: boolean = true;
    get hasQrCode(): boolean {
        return this._hasQrCode;
    }
    set hasQrCode(value: boolean) {
        this._hasQrCode = value;
    }

    _inProgress: boolean = false;
    get inProgress(): boolean {
        return this._inProgress;
    }
    set inProgress(value: boolean) {
        this._inProgress = value;
    }

    _inputTypePassword: string = "password";
    get inputTypePassword(): string {
        return this._inputTypePassword;
    }
    set inputTypePassword(value: string) {
        this._inputTypePassword = value;
    }

    showPassword() {
        if (this._inputTypePassword === "password") {
            this._inputTypePassword = "text";
        } else {
            this._inputTypePassword = "password";
        }
    }

    constructor(public _shared: SharedService, private _wallet: WalletService, private _router: Router,
        private route: ActivatedRoute, private _voteService: VoteService,
        private activatedRoute: ActivatedRoute, public location: Location,
        private _device: DeviceDetectorService, @Inject(PLATFORM_ID) platformId: Object
    ) {
        this.setDefaultWallet();

        // Hide qr on lame browsers
        let isPWA;
        if (isPlatformBrowser(platformId)) {
            isPWA = window.matchMedia('(display-mode: standalone)').matches;
        }
        let browser = _device.getDeviceInfo().browser;
        let lameBrowsers = ['safari'];
        if (lameBrowsers.indexOf(browser) > -1 && isPWA) {
            this.hasQrCode = false;
        }
    }

    async ngOnInit() {
        let id = this.activatedRoute.snapshot.params["id"];
        let p = <any>await this._voteService.getProposalByName(id);
        this.voteRequest.proposalId = p.proposalId;
        this.voteRequest.message = p.url;
        this.voteRequest.fromAddress = this.currentWallet.address;
    }

    setDefaultWallet() {
        if (!Util.isValidObject(this.currentWallet))
            this.currentWallet = _.first(this._shared.wallet)!;
    }

    async setWallet(currentWallet: Wallet, index?: number) {
        this.voteRequest.fromAddress = currentWallet.address;
        this.currentWallet = currentWallet;
        this.currentWalletIndex = index || 0;
        this.showWallets = false;
    }

    async sendVote() {
        if (!confirm(`Please, check your vote before you proceed. \nVote: ${this.voteRequest.voteType}\nAddress: ${this.voteRequest.fromAddress}\nProposal: ${this.voteRequest.message}`))
            return;
        this.inProgress = true;
        try {
            this.response = await this._voteService.sendVote(this.voteRequest);
            if (this.response.isValid) {
                this._voteService.proposals = (<any>await this._voteService.getProposals()).result;
                setTimeout(() => {
                    this._router.navigateByUrl('/proposal');
                    // window.location.href = './proposal';
                }, 3000);
            }
        } catch (ex) {
            console.log(ex);
        } finally {
            this.inProgress = false;
        }
    }

    async startQR() {
        // address is the id of the field that will be filled after a successful scan
        $("#iQR").attr("src", "qr/qrcode/index.html?password");
    }
    async stopQR() {
        $("#iQR").attr("src", "");
    }

    getWallets() {
        // return this._shared.wallet.filter((wallet: Wallet) => !wallet.isVault && !wallet.isScheduled);
        return this._shared.wallet;
    }
}