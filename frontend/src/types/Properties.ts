import type { User } from "./Users";

export interface Property extends NewProperty {
    id: string;
    tokenAddress: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface NewProperty {
    ownerId: User[ "id" ];
    isListed: boolean;
    beds: number;
    baths: number;
    sqft: number;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    propertyType: string;
    yearBuilt: number;
    price: number;
}

export interface DisplayProperty {
    property: Property;
    owner: User;
}