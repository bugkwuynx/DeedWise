import { Button } from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import type { NewProperty, Property } from "../../types/Properties";
import {
  createFungible,
  mplTokenMetadata,
} from "@metaplex-foundation/mpl-token-metadata";
import {
  createTokenIfMissing,
  findAssociatedTokenPda,
  getSplAssociatedTokenProgramId,
  mintTokensTo,
  mplToolbox,
} from "@metaplex-foundation/mpl-toolbox";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { generateSigner, percentAmount } from "@metaplex-foundation/umi";
import { base58 } from "@metaplex-foundation/umi/serializers";
import type { CreateTokenResponse } from "../../types/Token";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import type { WalletAdapter } from "@solana/wallet-adapter-base";
import { Keypair, type Signer, Transaction } from "@solana/web3.js";


export const PostPropertyButton = (property: NewProperty) => {
  const { publicKey, connected, wallet } = useWallet();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const createAndMintToken = async (
    propertyId: string
  ): Promise<CreateTokenResponse> => {
    try {

      if (!wallet) {
        throw new Error("Wallet not connected");
      }

      console.log(wallet);
      console.log("Wallet connected:", wallet.adapter.connected);
      console.log("Wallet public key:", wallet.adapter.publicKey?.toBase58());
      

      if (!wallet?.adapter || !wallet.adapter.connected) {
        await wallet.adapter.connect(); // Explicitly connect
      }      
      
      const umi = createUmi("https://api.devnet.solana.com")
        .use(mplTokenMetadata())
        .use(mplToolbox())
        .use(walletAdapterIdentity(wallet.adapter as WalletAdapter));

      const metadataUri = `${ propertyId }`;

      /**
       * Create a new signer to act as the mint authority for the token
       */
      const mintSigner = generateSigner(umi);

      /**
       * Create a new fungible token on Solana using the uploaded metadata
       */
      const createFungibleIx = createFungible(umi, {
        mint: mintSigner,
        name: `Property ${propertyId} Token`,
        uri: metadataUri,
        sellerFeeBasisPoints: percentAmount(0),
        decimals: 5,
      });

      /**
       * Create an associated token account for the owner (if it doesn't already exist)
       */

      const createTokenIx = createTokenIfMissing(umi, {
        mint: mintSigner.publicKey,
        owner: umi.identity.publicKey,
        ataProgram: getSplAssociatedTokenProgramId(umi),
      });

      /**
       * Mint tokens to the owner's token account
       */
      const mintTokensIx = mintTokensTo(umi, {
        mint: mintSigner.publicKey,
        token: findAssociatedTokenPda(umi, {
          mint: mintSigner.publicKey,
          owner: umi.identity.publicKey,
        }),
        amount: 100 * 10 ** 5,
      });

      /**
       * Send the transaction with all the above instructions combined
       */
      

      await umi.rpc.getLatestBlockhash();
      const tx = createFungibleIx
        .add(createTokenIx)
        .add(mintTokensIx)
        .sendAndConfirm(umi);
    

      /**
       * Deserialize and log the transaction signature for on-chain verification
       */
      const signature = tx.signature;

      console.log("*************");
      console.log("Transaction completed successfully!");
      console.log("View Transaction on Solana Explorer ");
      console.log(`https://explorer.solana.com/tx/${signature}?cluster=devnet`);
      console.log("View Token on Solana Explorer ");
      console.log(
        `https://explorer.solana.com/address/${mintSigner.publicKey}?cluster=devnet`
      );
      console.log("*************");

      return {
        mintAddress: mintSigner.publicKey.toString(),
        message: "Token created and minted successfully",
      };
    } catch (error) {
      console.error(error);
      return {
        mintAddress: "",
        message: "Failed to create and mint token",
      };
    }
  };

  const handlePostProperty = async () => {
    console.log(connected);
    console.log(publicKey);
    console.log(userId);
    console.log(token);

    if (!connected) {
      alert("Please connect your wallet");
      return;
    }

    const userAddress = publicKey?.toBase58();
    if (!userAddress) {
      alert("Please connect your wallet");
      return;
    }

    console.log(userAddress);

    if (!userId) {
      alert("Please login to post a property");
      return;
    }

    const propertyRequest: NewProperty = {
      ...property,
      ownerId: userId,
    };

    if (propertyRequest.address === "") {
      alert("Please enter an address");
      return;
    }

    if (propertyRequest.state === "Select State") {
      alert("Please select a state");
      return;
    }

    if (propertyRequest.city === "") {
      alert("Please enter a city");
      return;
    }

    const response: Response = await fetch(
      `${import.meta.env.VITE_API_URL}/properties`,
      {
        method: "POST",
        body: JSON.stringify(propertyRequest),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.ok) {
      const property: Property = await response.json();
      alert(`Property posted successfully.`);

      const tokenResponse = await createAndMintToken(property.id);

      try {
        if (tokenResponse.mintAddress) {
          alert(`Token minted: ${tokenResponse.mintAddress}`);
          console.log(
            `View on Solana Explorer: https://explorer.solana.com/address/${tokenResponse.mintAddress}?cluster=devnet`
          );
        } else {
          throw new Error(tokenResponse.message);
        }
      } catch (error) {
        alert(`Failed to mint token: ${error}`);
      }
    } else {
      alert("Failed to post property");
    }
  };

  return (
    <Button
      variant="contained"
      sx={{
        width: "100%",
        color: "white",
        backgroundColor: "black",
      }}
      onClick={handlePostProperty}
    >
      Post Property
    </Button>
  );
};

export default PostPropertyButton;
