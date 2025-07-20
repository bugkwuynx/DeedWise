import { NewTransaction, Transaction } from "../../types/transactions.types";
import { neon } from "@neondatabase/serverless";
import { buildSelectQuery } from "../../database/queryBuilder";
import { QueryOptions } from "../../database/queryOptions.types";


const sql = neon( process.env.DATABASE_URL! );

export const createTransaction = async (
    newTransaction: NewTransaction
): Promise<Transaction> => {
    const query = `
        INSERT INTO transactions (
            offer_id,
            buyer_id,
            seller_id,
            is_successful
        )
        VALUES ( $1, $2, $3, $4 )
        RETURNING
            id,
            offer_id as "offerId",
            buyer_id as "buyerId",
            seller_id as "sellerId",
            is_successful as "isSuccessful",
            created_at as "createdAt"
    `;

    const values = [
        newTransaction.offerId,
        newTransaction.buyerId,
        newTransaction.sellerId,
        newTransaction.isSuccessful
    ];

    const result = await sql.query( query, values );

    if ( result && result.length === 0 ) {
        throw new Error( "Failed to create transaction" );
    }

    return result[0] as Transaction;
}

export const getTransactionById = async ( id: string ): Promise<Transaction | null> => {
    const query = `
        SELECT
            id,
            offer_id as "offerId",
            buyer_id as "buyerId",
            seller_id as "sellerId",
            is_successful as "isSuccessful",
            created_at as "createdAt" 
        FROM transactions
        WHERE id = $1
    `;

    const values = [ id ];

    const result = await sql.query( query, values );

    if ( result && result.length === 0 ) {
        return null;
    }

    return result[0] as Transaction;
}

export const getTransactions = async (
    queryOptions: QueryOptions
): Promise<Transaction[] | null> => {
    const { queryClause, values } = buildSelectQuery( queryOptions );

    const query = `
        SELECT
            id,
            offer_id as "offerId",
            buyer_id as "buyerId",
            seller_id as "sellerId",
            is_successful as "isSuccessful",
            created_at as "createdAt"
        FROM transactions
        ${ queryClause }
    `;

    const getTransactionsResult = await sql.query( query, values );

    return getTransactionsResult as unknown as Transaction[];
}