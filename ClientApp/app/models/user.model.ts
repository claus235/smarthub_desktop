import { Util } from "./util";

export class User {
    public password: string;
    public confirmPassword: string;
    public userDescription: string;
    public isPhoneVerified: boolean;
    public dob: Date;
    public notifications: number;
    public userId: number;
    public firstName: string;
    public lastName: string;
    public username: string;
    public photo: string;
    public facebookId: string;
    public twitterId: string;
    public phone: string;
    public countryCode: string;
    public timeZone: string;
    public recoveryKey: string;
    public termsVersion: string;
    public lastLoginDate: string;
    public email: string;
    public is2FAEnabled: boolean;
    public require2faToSend: boolean;

    static map(from: any) {
        return Array.isArray(from) ? this.mapArray(from)[0] : this.mapObject(from);
    }
    static mapArray(from: any) {
        let a = []
        for (let i = 0; i < from.length; i++) a.push(this.mapObject(from[i]));
        return a;
    }

    static mapObject(from: any) {
        let to = new User();

        if (!Util.isValidObject(from))
            return to;

        try {
            to.password = from.password!;
            to.confirmPassword = from.confirmPassword!;
            to.userDescription = from.userDescription!;
            to.isPhoneVerified = from.isPhoneVerified!;
            to.dob = from.dob!;
            to.notifications = from.notifications!;
            to.userId = from.userId!;
            to.firstName = from.firstName!;
            to.lastName = from.lastName!;
            to.username = from.username!;
            to.photo = from.photo!;
            to.facebookId = from.facebookId!;
            to.twitterId = from.twitterId!;
            to.phone = from.phone!;
            to.countryCode = from.countryCode!;
            to.timeZone = from.timeZone!;
            to.recoveryKey = from.recoveryKey!;
            to.termsVersion = from.termsVersion!;
            to.lastLoginDate = from.lastLoginDate;
            to.email = from.email!;
            to.is2FAEnabled = from.is2FAEnabled!;
            to.require2faToSend = from.require2faToSend!
        } catch (e) {
            console.log("TRY TO MAP USER == ERROR");
            console.log(e);
        }
        return to;
    }
}