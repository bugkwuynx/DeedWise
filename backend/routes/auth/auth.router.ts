import { Router } from "express";
import {
    register, login, getUsersHandler
} from "../../controllers/auth/auth.ctrl";

const authRouter = Router();

authRouter.post( "/register", register );

authRouter.post( "/login", login );

authRouter.get( "/users", getUsersHandler );  

export default authRouter;