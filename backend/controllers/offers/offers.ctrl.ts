import { Request, Response } from "express";
import {
    Offer,
    NewOffer,
    CreateOfferRequest,
    GetOfferByIdRequest,
    GetOffersRequest,
    UpdateOfferRequest
} from "../../types/offers.types";
import { createOffer, getOfferById, updateOffer, getOffers } from "../../services/offers/offers.service";

export const createOfferHandler = async (
    req: CreateOfferRequest,
    res: Response<Offer | { message: string }>
) => {
    try {
        const newOffer = req.body;

        if ( !newOffer.propertyId || !newOffer.buyerId || !newOffer.sellerId ) {
            return res.status( 400 ).json( { message: "Missing required fields" } );
        }

        const offer = await createOffer( newOffer );
        res.status( 201 ).json( offer );

    } catch ( error ) {
        res.status( 500 ).json( { message: "Internal server error" } );
    }
}

export const getOfferByIdHandler = async (
    req: GetOfferByIdRequest,
    res: Response<Offer | { message: string }>
) => {
    try {
        const { id } = req.params;

        if ( !id ) {
            return res.status( 400 ).json( { message: "Offer ID is required" } );
        }

        const offer = await getOfferById( id );

        if ( !offer ) {
            return res.status( 404 ).json( { message: "Offer not found" } );
        }

        res.status( 200 ).json( offer );
    }
    catch ( error ) {
        res.status( 500 ).json( { message: "Internal server error" } );
    }
}

export const getOffersHandler = async (
    req: GetOffersRequest,
    res: Response<Offer[] | null | { message: string }>
) => {
    try {
        const queryOptions = req.query;

        const offers = await getOffers( {
            where: queryOptions
        } );

        res.status( 200 ).json( offers );
    }
    catch ( error ) {
        res.status( 500 ).json( { message: "Internal server error" } );
    }
}

export const updateOfferHandler = async (
    req: UpdateOfferRequest,
    res: Response<Offer | { message: string }>
) => {
    try {
        const { id } = req.params;
        const updatedOffer = req.body;

        if ( !id ) {
            return res.status( 400 ).json( { message: "Offer ID is required" } );
        }

        const offer = await updateOffer( id, updatedOffer );

        if ( !offer ) {
            return res.status( 404 ).json( { message: "Offer not found" } );
        }

        res.status( 200 ).json( offer );
    }
    catch ( error ) {
        res.status( 500 ).json( { message: `Internal server error ${ error }` } );
    }
}