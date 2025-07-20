import { Router } from "express";
import { createAndMintToken } from "../../controllers/createToken.ctrl";

const router = Router();

router.post( "/create-token", createAndMintToken );

export default router;