import { Injectable } from '@angular/core';

@Injectable()
export class TopMenuService {
    public _titlePage: string = '';
    public _showNavbar: boolean = false;

    constructor() { }

    get titlePage() {
        return this._titlePage;
    }

    set titlePage(titlePage: string) {
        this._titlePage = titlePage;
    }

    toggleNavbar() {
        this._showNavbar = !this._showNavbar;
    }
}