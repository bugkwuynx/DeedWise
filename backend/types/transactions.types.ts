import { Offer } from "./offers.types";
import { User } from "./users.types";
import { Request } from "express";

export interface Transaction {
    id: string;
    offerId: Offer["id"];
    buyerId: User["id"];
    sellerId: User["id"];
    isSuccessful: boolean;
    createdAt: Date;
}

export interface NewTransaction {
    offerId: Offer["id"];
    buyerId: User["id"];
    sellerId: User["id"];
    isSuccessful: boolean;
}

export interface CreateTransactionRequest extends Request {
    body: NewTransaction;
}

export interface GetTransactionByIdRequest extends Request {
    params: {
        id: string;
    }
}

export interface GetTransactionsRequest extends Request {
    query: {
        offerId?: Offer["id"];
        buyerId?: User["id"];
        sellerId?: User["id"];
        isSuccessful?: string;
    }
}
