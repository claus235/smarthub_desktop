export class UserRequest {
    public email: string;
    public password: string;
    public firstName: string;
    public lastName: string;
    public username: string;
    public photo: string;
    public facebookId: string;
    public phone: string;
    public userDescription: string;
    public countryCode: string;
    public timeZone: string;
    public recoveryKey: string;
    public termsVersion: string;
    public responseRecaptcha: string;
    public userKey: string;

    static map(from: any) {
        return Array.isArray(from) ? this.mapArray(from)[0] : this.mapObject(from);
    }
    static mapArray(from: any) {
        let a = []
        for (let i = 0; i < from.length; i++) a.push(this.mapObject(from[i]));
        return a;
    }

    static mapObject(from: any) {
        let to = new UserRequest();
        try {
            to.email = from.email!;
            to.password = from.password!;
            to.firstName = from.firstName!;
            to.lastName = from.lastName!;
            to.username = from.username!;
            to.photo = from.photo!;
            to.facebookId = from.facebookId!;
            to.phone = from.phone!;
            to.userDescription = from.userDescription!;
            to.countryCode = from.countryCode!;
            to.timeZone = from.timeZone!;
            to.recoveryKey = from.recoveryKey!;
            to.termsVersion = from.termsVersion!;
            to.responseRecaptcha = from.responseRecaptcha!;
            to.userKey = from.userKey!;
        } catch (e) {
            console.log("TRY TO MAP USER == EROR");
            console.log(e);
        }
        return to;
    }
}