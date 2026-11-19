export interface RegisterRequest {
    username: string;
    password: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface TokenResponse {
    access: string;
    refresh: string;
}

export interface TokenRefreshResponse {
    access: string;
    refresh?: string;
}