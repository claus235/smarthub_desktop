import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { CoolLocalStorage } from "angular2-cool-storage";
import { Util } from "../models/util";

@Injectable()
export class BaseLocalStorageService {
    constructor(protected storage: CoolLocalStorage) {
    }
    public getItemWithoutTime(itemKey: string): any {
        let obj: any = null;
        try {
            if (Util.isValidObject(this.storage.tryGetObject(itemKey))) {
                let cashedObject = JSON.parse(this.storage.getItem(itemKey));
                if (Util.isValidObject(cashedObject) && cashedObject.status !== 401) {
                    obj = cashedObject.storedObject;
                }
            }
        }
        catch (e) {
            console.log("ERROR TO GET : " + itemKey);
            console.log(e);
        }
        return obj;
    }
    public getItem(itemKey: string): any {
        let obj: any = null;
        try {
            if (Util.isValidObject(this.storage.tryGetObject(itemKey))) {
                let cashedObject = JSON.parse(this.storage.getItem(itemKey));
                if (Util.isValidObject(cashedObject) && cashedObject.status !== 401) {
                    let dateBack = new Date(JSON.parse(JSON.stringify(cashedObject.dateItWasStored)));
                    if (Util.howLongAGo(dateBack) < 15) {
                        obj = cashedObject.storedObject;
                    }
                }
            }
        }
        catch (e) {
            console.log("ERROR TO GET : " + itemKey);
            console.log(e);
        }
        return obj;
    }
    public setItem(itemKey: string, item: any): boolean {
        

        let minutesToExire = 15;
        let date = new Date();

        

        let new_date = new Date(date);
        new_date.setMinutes(date.getMinutes() + minutesToExire);

        let cashedObject = {
            dateItWasStored: date,
            dateOfExpiration: new_date,
            storedObject: item
        };

        
        

        let obj: boolean = false;
        try {
            if (Util.isValidObject(this.storage.tryGetObject(itemKey))) {
                this.storage.removeItem(itemKey);
            }
            this.storage.setItem(itemKey, JSON.stringify(cashedObject));
            obj = true;
        }
        catch (e) {
            console.log("ERROR TO INSERT : " + itemKey);
            console.log(e);
        }
        return obj;
    }
    public removeItem(itemKey: string): boolean {
        let obj: boolean = false;
        try {
            if (Util.isValidObject(this.storage.tryGetObject(itemKey))) {
                this.storage.removeItem(itemKey);
                obj = true;
            }
        }
        catch (e) {
            console.log("ERROR TO REMOVE : " + itemKey);
            console.log(e);
        }
        return obj;
    }
}