import { Request } from "express";

export interface CreateTokenRequest extends Request {
    body: {
        propertyId: string;
    }
}

export interface CreateTokenResponse {
    mintAddress: string;
    message: string;
}