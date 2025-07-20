import { Router } from "express";
import {
    createOfferHandler,
    getOfferByIdHandler,
    getOffersHandler,
    updateOfferHandler
} from "../../controllers/offers/offers.ctrl";

const router = Router();

router.post( "/", createOfferHandler );
router.get( "/:id", getOfferByIdHandler );
router.get( "/", getOffersHandler );
router.patch( "/:id", updateOfferHandler );

export default router;