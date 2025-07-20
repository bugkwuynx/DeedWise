import {
    createFungible,
    createV1,
    findMetadataPda,
    mplTokenMetadata
} from "@metaplex-foundation/mpl-token-metadata";
import { createTokenIfMissing, findAssociatedTokenPda, getSplAssociatedTokenProgramId, mintTokensTo, mplToolbox } from "@metaplex-foundation/mpl-toolbox";
import {
    createSignerFromKeypair,
    generateSigner,
    keypairIdentity,
    percentAmount,
    signerIdentity,
    sol
} from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import { base58 } from "@metaplex-foundation/umi/serializers";
import { CreateTokenRequest, CreateTokenResponse } from "../types/tokens.types";
import { Response } from "express";

export const createAndMintToken = async ( propertyId: string ) => {
    try {
        const umi = createUmi( "https://api.devnet.solana.com" )
            .use( mplTokenMetadata() )
            .use( mplToolbox() )
            .use( irysUploader() );
    
        /**
         * Convert the wallet file JSON into a Unit8Array usable as a keypair
         */
        const secretKey = new Uint8Array( JSON.parse( process.env.keypair! ) ); 
        const umiSigner = umi.eddsa.createKeypairFromSecretKey( secretKey );
        umi.use( keypairIdentity( umiSigner ) );
    
        /**
         * Define metadata for your token with propertyId
         */
        const metadata = {
            name: `Property ${ propertyId } Token`,
            symbol: "MTK",
            description: `Property ${ propertyId } Token`,
            propertyId: propertyId
        };
    
        /**
         * Upload the metadata to Arweave via Irys
         */
        console.log( "Uploading metadata to Arweave via Irys..." );
        const metadataUri = await umi.uploader.uploadJson( metadata )
            .catch( ( error ) => {
                throw new Error( error );
            } );
    
        /**
         * Create a new signer to act as the mint authority for the token
         */
        const mintSigner = generateSigner( umi );
    
        /**
         * Create a new fungible token on Solana using the uploaded metadata
         */
        const createFungibleIx = createFungible( umi, {
            mint: mintSigner,
            name: `Property ${ propertyId } Token`,
            uri: metadataUri,
            sellerFeeBasisPoints: percentAmount( 0 ),
            decimals: 5
        } );
    
        /**
         * Create an associated token account for the owner (if it doesn't already exist)
         */
        const createTokenIx = createTokenIfMissing( umi, {
            mint: mintSigner.publicKey,
            owner: umi.identity.publicKey,
            ataProgram: getSplAssociatedTokenProgramId( umi )
        } );
    
        /**
         * Mint tokens to the owner's token account
         */
        const mintTokensIx =  mintTokensTo( umi, {
            mint: mintSigner.publicKey,
            token: findAssociatedTokenPda( umi, {
                mint: mintSigner.publicKey,
                owner: umi.identity.publicKey
            } ),
            amount:  100 * 10 ** 5
        } );
    
        /**
         * Send the transaction with all the above instructions combined
         */
        const tx = await createFungibleIx
            .add( createTokenIx )
            .add( mintTokensIx )
            .sendAndConfirm( umi );
    
        /**
         * Deserialize and log the transaction signature for on-chain verification
         */
        const signature = base58.deserialize( tx.signature )[ 0 ];
    
        console.log( "*************" );
        console.log( "Transaction completed successfully!" );
        console.log( "View Transaction on Solana Explorer " );
        console.log( `https://explorer.solana.com/tx/${ signature }?cluster=devnet` );
        console.log( "View Token on Solana Explorer " );
        console.log( `https://explorer.solana.com/address/${ mintSigner.publicKey }?cluster=devnet` );
        console.log( "*************" );
    
        return {
            mintAddress: mintSigner.publicKey.toString(),
            message: "Token created and minted successfully"
        }
    } catch (error) {
        console.error( error );
        return {
            message: "Failed to create and mint token"
        }
    }
}