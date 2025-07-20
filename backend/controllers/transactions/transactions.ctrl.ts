import { Request, Response } from "express";
import {
    CreateTransactionRequest,
    GetTransactionByIdRequest,
    GetTransactionsRequest,
    NewTransaction,
    Transaction
} from "../../types/transactions.types";
import {
    createTransaction,
    getTransactionById,
    getTransactions
} from "../../services/transactions/transactions.service";

export const createTransactionHandler = async (
    req: CreateTransactionRequest,
    res: Response<Transaction | { message: string }>
) => {
    try {
        const newTransaction = req.body;
        const transaction = await createTransaction( newTransaction );
        res.status( 201 ).json( transaction );
    }
    catch ( error ) {
        console.error( error );
        res.status( 500 ).json( { message: "Internal server error" } );
    }
};

export const getTransactionByIdHandler = async (
    req: GetTransactionByIdRequest,
    res: Response<Transaction | { message: string }>
) => {
    try {
        const { id } = req.params;
        const transaction = await getTransactionById( id );

        if ( !transaction ) {
            return res.status( 404 ).json( { message: "Transaction not found" } );
        }

        res.status( 200 ).json( transaction );
    }
    catch ( error ) {
        console.error( error );
        res.status( 500 ).json( { message: "Internal server error" } );
    }
};

export const getTransactionsHandler = async (
    req: GetTransactionsRequest,
    res: Response<Transaction[] | null | { message: string }>
) => {
    try {
        const queryOptions = req.query;

        const transactions = await getTransactions( {
            where: queryOptions
        } );

        res.status( 200 ).json( transactions );
    }
    catch ( error ) {
        console.error( error );
        res.status( 500 ).json( { message: "Internal server error" } );
    }
};