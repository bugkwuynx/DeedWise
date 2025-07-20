import { NewOffer, Offer } from "../../types/offers.types";
import { neon } from "@neondatabase/serverless";
import { buildSelectQuery, buildUpdateQuery } from "../../database/queryBuilder";
import { QueryOptions, UpdateQueryOptions } from "../../database/queryOptions.types";

const sql = neon( process.env.DATABASE_URL! );

export const createOffer = async (
    newOffer: NewOffer
): Promise<Offer> => {
    const query = `
        INSERT INTO offers (
            property_id,
            buyer_id,
            seller_id,
            offer_price
        )
        VALUES ( $1, $2, $3, $4 )
        RETURNING
            id,
            property_id as "propertyId",
            buyer_id as "buyerId",
            seller_id as "sellerId",
            is_buyer_signed as "isBuyerSigned",
            buyer_signed_date as "buyerSignedDate",
            is_seller_signed as "isSellerSigned",
            seller_signed_date as "sellerSignedDate",
            is_completed as "isCompleted",
            completed_date as "completedDate",
            is_cancelled as "isCancelled",
            cancelled_date as "cancelledDate",
            offer_price as "offerPrice",
            created_at as "createdAt",
            updated_at as "updatedAt"
    `;

    const values = [
        newOffer.propertyId,
        newOffer.buyerId,
        newOffer.sellerId,
        newOffer.offerPrice
    ];

    const result = await sql.query( query, values );

    if ( result && result.length === 0 ) {
        throw new Error( "Failed to create offer" );
    }

    return result[0] as Offer;
}

export const getOfferById = async ( id: string ): Promise<Offer | null> => {
    const query = `
        SELECT
            id,
            property_id as "propertyId",
            buyer_id as "buyerId",
            seller_id as "sellerId",
            is_buyer_signed as "isBuyerSigned",
            buyer_signed_date as "buyerSignedDate",
            is_seller_signed as "isSellerSigned",
            seller_signed_date as "sellerSignedDate",
            is_completed as "isCompleted",
            completed_date as "completedDate",
            is_cancelled as "isCancelled",
            cancelled_date as "cancelledDate",
            offer_price as "offerPrice",
            created_at as "createdAt",
            updated_at as "updatedAt"
        FROM offers
        WHERE id = $1
    `;

    const values = [ id ];

    const result = await sql.query( query, values );

    if ( result && result.length === 0 ) {
        return null;
    }

    return result[0] as Offer;
}

export const updateOffer = async (
    id: string,
    updatedOffer: Partial<Offer>
): Promise<Offer | null> => {
    const query = `
        UPDATE offers
        ${ buildUpdateQuery( updatedOffer as UpdateQueryOptions ) }
        WHERE id = $${ Object.keys( updatedOffer ).length + 1 }
        RETURNING
            id,
            property_id as "propertyId",
            buyer_id as "buyerId",
            seller_id as "sellerId",
            is_buyer_signed as "isBuyerSigned",
            buyer_signed_date as "buyerSignedDate",
            is_seller_signed as "isSellerSigned",
            seller_signed_date as "sellerSignedDate",
            is_completed as "isCompleted",
            completed_date as "completedDate",
            is_cancelled as "isCancelled",
            cancelled_date as "cancelledDate",
            offer_price as "offerPrice",
            created_at as "createdAt",
            updated_at as "updatedAt"
    `;

    const values = [ ...Object.values( updatedOffer ), id ];

    const result = await sql.query( query, values );

    if ( result && result.length === 0 ) {
        return null;
    }

    return result[0] as Offer;
}

export const getOffers = async (
    queryOptions: QueryOptions
): Promise<Offer[] | null> => {
    const { queryClause, values } = buildSelectQuery( queryOptions );

    const query = `
        SELECT
            id,
            property_id as "propertyId",
            buyer_id as "buyerId",
            seller_id as "sellerId",
            is_buyer_signed as "isBuyerSigned",
            buyer_signed_date as "buyerSignedDate",
            is_seller_signed as "isSellerSigned",
            seller_signed_date as "sellerSignedDate",
            is_completed as "isCompleted",
            completed_date as "completedDate",
            is_cancelled as "isCancelled",
            cancelled_date as "cancelledDate",
            offer_price as "offerPrice",
            created_at as "createdAt",
            updated_at as "updatedAt"
        FROM offers ${ queryClause }
    `;

    const getOffersResult = await sql.query( query, values );

    return getOffersResult as unknown as Offer[];
}