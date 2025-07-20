import { Router } from "express";
import { getUsersHandler } from "../../controllers/auth/auth.ctrl";

const router = Router();

router.get( "/", getUsersHandler );

export default router;

