export class ContactResponse {
    public contactId: number;
    public name: string;
    public address: string;
    public email: string;
    public phone: string;

    static map(from: any): ContactResponse[] {
        return this.mapArray(from);
    }
    static mapArray(from: any) {
        let a = []
        for (let i = 0; i < from.length; i++) a.push(this.mapObject(from[i]));
        return a;
    }

    static mapObject(from: any) {
        let r = new ContactResponse;
        r.contactId = from.contactId!;
        r.name = from.name!;
        r.address = from.address!;
        r.email = from.email!;
        r.phone = from.phone!;
        return r;
    }
}