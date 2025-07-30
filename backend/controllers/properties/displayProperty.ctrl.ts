import { Request, Response } from "express";
import { Property, DisplayProperty } from "../../types/properties.types";
import { getPropertyById } from "../../services/properties/properties.service";
import { getUsers } from "../../services/users/users.service";

export const getPropertyDisplayHandler = async (
    req: Request<{ propertyId: string }>,
    res: Response<DisplayProperty | { message: string }>
) => {
    try {
        const { propertyId } = req.params;

        if ( !propertyId ) {
            return res.status( 400 ).json( { message: "Property ID is required" } );
        }

        const property = await getPropertyById( propertyId );

        if ( !property ) {
            return res.status( 404 ).json( { message: "Property not found" } );
        }

        const propertyOwner = await getUsers( {
            where: {
                id: property.ownerId
            }
        } );
        
        if ( !propertyOwner ) {
            return res.status( 404 ).json( { message: "Property owner not found" } );
        }

        res.status( 200 ).json( {
            property,
            owner: propertyOwner[0]
        } );
    }
    catch ( error ) {
        res.status( 500 ).json( { message: "Internal server error" } );
    }
}
