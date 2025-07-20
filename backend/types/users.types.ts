import { Request, Response } from "express";

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

export interface LoginRequest extends Request {
    body: {
        userName?: string;
        password?: string;
    }
}

export interface RegisterRequest extends Request {
    body: {
        walletAddress?: string;
        firstName?: string;
        lastName?: string;
        userName?: string;
        email?: string;
        password?: string;
    }
}

export interface LoginResponse {
    userId: User[ "id" ];
    token: string;
}

export interface GetUsersRequest extends Request {
    query: {
        walletAddress?: string;
        firstName?: string;
        lastName?: string;
        userName?: string;
        email?: string;
    }
}