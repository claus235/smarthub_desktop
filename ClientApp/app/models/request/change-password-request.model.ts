export class ChangePasswordRequest {
    public username: string;
    public password: string;
    public twoFactorAuthentication: string = null!;
    public grant_type: string;
    public client_id: string;
    public client_secret: string;
    public recoveryKey: string;
}