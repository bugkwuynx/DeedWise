import { Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, getUserByUserName } from "../../services/users/users.service";
import { RegisterRequest, LoginRequest, User, LoginResponse } from "../../types/users.types";

export const register = async ( req: RegisterRequest, res: Response<User | { message: string }> ) => {
    try {
        const {
            walletAddress,
            firstName,
            lastName,
            userName,
            email,
            password
        } = req.body;

        if ( !walletAddress || !firstName || !lastName || !userName || !email || !password ) {
            return res.status( 400 ).json( { message: "All fields are required" } );
        }

        const existingUser = await getUserByUserName( userName );
    
        if ( existingUser ) {
            return res.status( 400 ).json( { message: "User already exists" } );
        }
    
        const hashedPassword = await bcrypt.hash( password, 10 );
    
        const createUserResult = await createUser( {
            walletAddress,
            firstName,
            lastName,
            userName,
            email,
            passwordHash: hashedPassword
        } );
    
        res.status( 201 ).json( createUserResult );   
    } catch ( error ) {
        res.status( 500 ).json( { message: `Internal server error: ${ error }` } );
    }
};

export const login = async ( req: LoginRequest, res: Response<LoginResponse | null | { message: string }> ) => {
    try {
        const { userName, password } = req.body;

        if ( !userName || !password ) {
            return res.status( 400 ).json( { message: "All fields are required" } );
        }

        const user: User | null = await getUserByUserName( userName );

        if ( !user ) {
            return null;
        }

        if ( !user.passwordHash ) {
            return res.status( 500 ).json( { message: "User password hash is missing" } );
        }

        const isPasswordValid = await bcrypt.compare( password, user.passwordHash );

        if ( !isPasswordValid ) {
            return res.status( 401 ).json( { message: "Invalid credentials" } );
        }

        const token = jwt.sign( { userId: user.id }, process.env.JWT_SECRET!, { expiresIn: "24h" } );

        res.status( 200 ).json( { userId: user.id, token } );
    } catch ( error ) {
        res.status( 500 ).json( { message: `Internal server error: ${ error }` } );
    }
};