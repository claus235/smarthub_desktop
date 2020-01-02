export class TokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    error: string;
    error_description: string;

    static map(from: any): TokenResponse {
        let r = new TokenResponse;
        r.access_token = from.access_token!;
        r.expires_in = from.expires_in!;
        r.refresh_token = from.refresh_token!;
        r.token_type = from.token_type!;
        r.error = from.error!;
        r.error_description = from.error_description!;
        return r;
    }
}