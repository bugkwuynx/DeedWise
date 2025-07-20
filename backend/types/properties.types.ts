import { User } from "./users.types";
import { Request } from "express";

export interface Property {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface NewProperty extends Property {
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
}

export interface CreatePropertyRequest extends Request {
    body: NewProperty;
}

export interface GetPropertyByIdRequest extends Request {
    params: {
        id: string;
    }
}

export interface GetPropertiesRequest extends Request {
    query: {
        isListed?: string;
        beds?: string;
        baths?: string;
        sqft?: string;
        address?: string;
        city?: string;
        state?: string;
        zipCode?: string;
        propertyType?: string;
        yearBuilt?: string;
    }
}

export interface UpdatePropertyRequest extends Request {
    params: {
        id: string;
    };
    body: Partial<NewProperty>;
}