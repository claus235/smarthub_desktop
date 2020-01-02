export class TokenRequest {
    public username: string;
    public password: string;
    public twoFactorAuthentication: string;
    public grant_type: string;
    public client_id: string;
    public client_secret: string;
    public responseRecaptcha: string;
}