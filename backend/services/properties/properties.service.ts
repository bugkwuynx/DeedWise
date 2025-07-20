import { NewProperty, Property, UpdatePropertyRequest } from "../../types/properties.types";
import { neon } from "@neondatabase/serverless";
import { buildSelectQuery, buildUpdateQuery } from "../../database/queryBuilder";
import { QueryOptions, UpdateQueryOptions } from "../../database/queryOptions.types";

const sql = neon( process.env.DATABASE_URL! );

export const createProperty = async (
    newProperty: NewProperty
): Promise<Property> => {
    const query = `
        INSERT INTO properties (
            owner_id,
            is_listed,
            beds,
            baths,
            sqft,
            address,
            city,
            state,
            zip_code,
            property_type,
            year_built
        )
        VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11 )
        RETURNING
            id,
            owner_id as "ownerId",
            is_listed as "isListed",
            beds as "beds",
            baths as "baths",
            sqft as "sqft",
            address as "address",
            city as "city",
            state as "state",
            zip_code as "zipCode",
            property_type as "propertyType",
            year_built as "yearBuilt",
            created_at as "createdAt",
            updated_at as "updatedAt"
    `;

    const values = [
        newProperty.ownerId,
        newProperty.isListed,
        newProperty.beds,
        newProperty.baths,
        newProperty.sqft,
        newProperty.address,
        newProperty.city,
        newProperty.state,
        newProperty.zipCode,
        newProperty.propertyType,
        newProperty.yearBuilt
    ];

    const result = await sql.query( query, values );

    if ( result && result.length === 0 ) {
        throw new Error( "Failed to create property" );
    }

    return result[0] as Property;
}

export const getPropertyById = async (id: string ): Promise<Property | null> => {
    const query = `
        SELECT
            id,
            owner_id as "ownerId",
            is_listed as "isListed",
            beds as "beds",
            baths as "baths",
            sqft as "sqft",
            address as "address",
            city as "city",
            state as "state",
            zip_code as "zipCode",
            property_type as "propertyType",
            year_built as "yearBuilt",
            created_at as "createdAt",
            updated_at as "updatedAt"
        FROM properties
        WHERE id = $1
    `;

    const values = [ id ];

    const result = await sql.query( query, values );

    if ( result && result.length === 0 ) {
        return null;
    }

    return result[0] as Property;
}

export const updateProperty = async ( id: string, updatedProperty: Partial<NewProperty> ): Promise<Property | null> => {
    const query = `
        UPDATE properties
        ${ buildUpdateQuery( updatedProperty as UpdateQueryOptions  ) }
        WHERE id = $${ Object.keys( updatedProperty ).length + 1 }
        RETURNING
            id,
            owner_id as "ownerId",
            is_listed as "isListed",
            beds as "beds",
            baths as "baths",
            sqft as "sqft",
            address as "address",
            city as "city",
            state as "state",
            zip_code as "zipCode",
            property_type as "propertyType",
            year_built as "yearBuilt",
            created_at as "createdAt",
            updated_at as "updatedAt"
    `;

    const values = [ ...Object.values( updatedProperty ), id ];

    const result = await sql.query( query, values );

    if ( result && result.length === 0 ) {
        return null;
    }

    return result[0] as Property;
};

export const getProperties = async ( queryOptions: QueryOptions ): Promise<Property[] | null> => {
    const { queryClause, values } = buildSelectQuery( queryOptions );

    const query = `
        SELECT 
            id,
            owner_id as "ownerId",
            is_listed as "isListed",
            beds as "beds",
            baths as "baths",
            sqft as "sqft",
            address as "address",
            city as "city",
            state as "state",
            zip_code as "zipCode",
            property_type as "propertyType",
            year_built as "yearBuilt",
            created_at as "createdAt",
            updated_at as "updatedAt"            
        FROM properties ${ queryClause }
    `;

    const getPropertiesResult = await sql.query( query, values );

    return getPropertiesResult as unknown as Property[];
};

