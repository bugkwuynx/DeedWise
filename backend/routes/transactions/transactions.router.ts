import { Router } from "express";
import {
    createTransactionHandler,
    getTransactionByIdHandler,
    getTransactionsHandler
} from "../../controllers/transactions/transactions.ctrl";

const router = Router();

router.post( "/", createTransactionHandler );
router.get( "/:id", getTransactionByIdHandler );
router.get( "/", getTransactionsHandler );

export default router;

