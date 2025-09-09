import type { Property } from "./Properties";
import type { User } from "./Users";

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