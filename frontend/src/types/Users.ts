export interface User extends NewUser {
    id: string;
    createdAt: Date;
    updatedAt: Date;
};

export interface NewUser {
    walletAddress: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    passwordHash: string;
};

export interface LoginRequest {
    userName: string;
    password: string;
}

export interface LoginResponse {
    userId: User[ "id" ];
    token: string;
}

export interface SignupRequest {
    walletAddress: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
}
