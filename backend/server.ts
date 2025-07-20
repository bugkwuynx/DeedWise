import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { neon } from "@neondatabase/serverless";
import { IncomingMessage, ServerResponse } from "http";
import jwt from "jsonwebtoken";

dotenv.config();

import authRouter from "./routes/auth/auth.router";
import propertiesRouter from "./routes/properties/properties.router";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sql = neon( process.env.DATABASE_URL! );

const authenticateJWT = ( req: Request, res: Response, next: NextFunction ) => {
    const token = req.headers.authorization?.split( ' ' )[ 1 ];

    if ( !token ) {
        return res.status( 401 ).send( "Unauthorized" );
    }

    jwt.verify( token, process.env.JWT_SECRET!, ( err, user ) => {
        if ( err ) {
            return res.status( 403 ).send( "Forbidden" );
        }

        ( req as any ).user = user;
        next();
    } );
}

app.get( "/", async ( req: IncomingMessage, res: ServerResponse ) => {
    const result = await sql`SELECT version()`;
    const { version } = result[0];
    res.writeHead( 200, { "Content-Type": "text/plain" } );
    res.end( version.toString() );
});

app.use( "/auth", authenticateJWT, authRouter );
app.use( "/properties", authenticateJWT, propertiesRouter );

app.get( "/protected", authenticateJWT, ( req: Request, res: Response ) => {
    res.send('This is a protected route');
} );

app.listen( PORT, () => {
    console.log( `Server is running on port ${process.env.PORT}` );
} );