import { Router } from "express";
import {
    register, login
} from "../../controllers/auth/auth.ctrl";

const authRouter = Router();

authRouter.post( "/register", register );

authRouter.post( "/login", login ); 

export default authRouter;