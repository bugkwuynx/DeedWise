import { NewUser, User } from "../../types/users.types";
import { neon } from "@neondatabase/serverless";
import { QueryOptions } from "../../database/queryOptions.types";
import { buildSelectQuery } from "../../database/queryBuilder";

const sql = neon( process.env.DATABASE_URL! );

export const createUser = async ( newUser: NewUser ): Promise<User> => {
    const query = `
        INSERT INTO users (
            wallet_address,
            first_name,
            last_name,
            user_name,
            email,
            password_hash
        )
        VALUES ( $1, $2, $3, $4, $5, $6 )
        RETURNING
            id,
            wallet_address AS "walletAddress",
            first_name AS "firstName",
            last_name AS "lastName",
            user_name AS "userName",
            email AS "email",
            password_hash AS "passwordHash",
            created_at AS "createdAt",
            updated_at AS "updatedAt"
    `;

    const values = [
        newUser.walletAddress,
        newUser.firstName,
        newUser.lastName,
        newUser.userName,
        newUser.email,
        newUser.passwordHash
    ];

    const result = await sql.query( query, values );
    
    if ( result && result.length === 0 ) {
        throw new Error( "Failed to create user" );
    }

    return result[ 0 ] as User;
};

export const getUserByUserName = async ( userName: User[ "userName" ] ): Promise<User | null> => {
    const query = `
        SELECT
            id,
            wallet_address AS "walletAddress",
            first_name AS "firstName",
            last_name AS "lastName",
            user_name AS "userName",
            email AS "email",
            password_hash AS "passwordHash",
            created_at AS "createdAt",
            updated_at AS "updatedAt"
        FROM users
        WHERE user_name = $1
    `;

    const values = [ userName ];
    const result = await sql.query( query, values );
    
    if ( result && result.length === 0 ) {
        return null;
    }

    return result[ 0 ] as User;
};

export const getUsers = async(
    queryOptions: QueryOptions
): Promise<User[] | null> => {
    const { queryClause, values } = buildSelectQuery( queryOptions );

    const query = `
        SELECT
            id,
            wallet_address AS "walletAddress",
            first_name AS "firstName",
            last_name AS "lastName",
            user_name AS "userName",
            email AS "email",
            password_hash AS "passwordHash",
            created_at AS "createdAt",
            updated_at AS "updatedAt"
        FROM users ${ queryClause }
    `;

    const getUsersResult = await sql.query( query, values );

    return getUsersResult as unknown as User[];
}