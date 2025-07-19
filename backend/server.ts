import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { neon } from "@neondatabase/serverless";
import { createServer, IncomingMessage, ServerResponse } from "http";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

const sql = neon( process.env.DATABASE_URL! );

app.get( "/", async ( req: IncomingMessage, res: ServerResponse ) => {
    const result = await sql`SELECT version()`;
    const { version } = result[0];
    res.writeHead( 200, { "Content-Type": "text/plain" } );
    res.end( version.toString() );
});

app.listen( process.env.PORT, () => {
    console.log( `Server is running on port ${process.env.PORT}` );
});