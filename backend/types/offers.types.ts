import { Request } from "express";
import { Property } from "./properties.types";
import { User } from "./users.types";

export interface Offer extends NewOffer, OfferStatus {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface OfferStatus {
    isBuyerSigned: boolean;
    buyerSignedDate: Date;
    isSellerSigned: boolean;
    sellerSignedDate: Date;
    isCompleted: boolean;
    completedDate: Date;
    isCancelled: boolean;
    cancelledDate: Date;
}

export interface NewOffer {
    propertyId: Property["id"];
    buyerId: User["id"];
    sellerId: User["id"];
    offerPrice: number;
}

export interface CreateOfferRequest extends Request {
    body: {
        propertyId: Property["id"];
        buyerId: User["id"];
        sellerId: User["id"];
        offerPrice: number;
    };
}

export interface GetOfferByIdRequest extends Request {
    params: {
        id: string;
    }
}

export interface GetOffersRequest extends Request {
    query: {
        propertyId?: Property["id"];
        buyerId?: User["id"];
        sellerId?: User["id"];
        isBuyerSigned?: string;
        buyerSignedDate?: string;
        isSellerSigned?: string;
        sellerSignedDate?: string;
        isCompleted?: string;
        completedDate?: string;
        isCancelled?: string;
        cancelledDate?: string;
        offerPrice?: string;
    }
}

export interface UpdateOfferRequest extends Request {
    params: {
        id: string;
    }
    body: {
        isBuyerSigned?: boolean;
        isSellerSigned?: boolean;
        isCompleted?: boolean;
        isCancelled?: boolean;
    }
}