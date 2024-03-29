export interface TokenResponse {
    jwtToken: string;
    expires_in: number;
    jti: string;
    refresh_token: string;
    scope: string;
    token_type: string;
}
