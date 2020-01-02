export class CoreResponse {
    data: any;
    error?: any;
    status: string;
    isValid: boolean;

    static map(from: any): CoreResponse {
        let r = new CoreResponse;
        r.error = from.error!;
        r.status = from.status!;
        r.isValid = from.isValid!;
        r.data = from.data;
        return r;
    }
}