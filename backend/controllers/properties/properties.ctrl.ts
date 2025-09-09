import { Request, Response } from "express";
import {
    CreatePropertyRequest,
    GetPropertyByIdRequest,
    GetPropertiesRequest,
    Property,
    UpdatePropertyRequest
} from "../../types/properties.types";
import {
    createProperty,
    getPropertyById,
    getProperties,
    updateProperty
} from "../../services/properties/properties.service";

export const createPropertyHandler = async (
    req: CreatePropertyRequest,
    res: Response<Property | { message: string }>
) => {
    try {
        const newProperty = req.body;

        if ( !newProperty.ownerId ) {
            return res.status( 400 ).json( { message: "Owner ID is required" } );
        }
        
        const property = await createProperty( newProperty );

        res.status( 201 ).json( property );
    }
    catch ( error ) {
        console.error( error );
        res.status( 500 ).json( { message: "Internal server error" } );
    }
};

export const getPropertyByIdHandler = async (
    req: GetPropertyByIdRequest,
    res: Response<Property | { message: string }>
) => {
    try {
        const { id } = req.params;

        if ( !id ) {
            return res.status( 400 ).json( { message: "Property ID is required" } );
        }

        const property = await getPropertyById( id );

        if ( !property ) {
            return res.status( 404 ).json( { message: "Property not found" } );
        }

        res.status( 200 ).json( property );
    }
    catch ( error ) {
        console.error( error );
        res.status( 500 ).json( { message: "Internal server error" } );
    }
};

export const getPropertiesHandler = async (
    req: GetPropertiesRequest,
    res: Response<Property[] | null | { message: string }>
) => {
    try {
        const queryOptions = req.query;

        const properties = await getProperties( {
            where: queryOptions
        } );

        res.status( 200 ).json( properties );
    }
    catch ( error ) {
        res.status( 500 ).json( { message: "Internal server error" } );
    }
};

export const updatePropertyHandler = async (
    req: UpdatePropertyRequest,
    res: Response<Property | { message: string }>
) => {
    try {
        const { id } = req.params;
        const updatedProperty = req.body;

        if ( !id ) {
            return res.status( 400 ).json( { message: "Property ID is required" } );
        }

        const property = await updateProperty( id, updatedProperty );

        if ( !property ) {
            return res.status( 404 ).json( { message: "Property not found" } );
        }

        res.status( 200 ).json( property );
    }
    catch ( error ) {
        res.status( 500 ).json( { message: `Internal server error ${ error }` } );
    }
};


