import { Button } from "@mui/material";
import type { DisplayProperty } from "../../types/Properties";
import { useAnchorWallet, useConnection, useWallet } from "@solana/wallet-adapter-react";
import { AnchorProvider, setProvider, Program, type Idl, web3 } from "@coral-xyz/anchor";
import idl from "../../../../smart-contract/target/idl/smart_contract.json";
import { type PublicKey } from "@solana/web3.js";
import { Buffer } from "buffer";
import type { Offer } from "../../types/Offers";
interface PurchasePropertyButtonProps {
  displayProperty: DisplayProperty,
  buyerId: string;
}

const PurchasePropertyButton = ({
  displayProperty,
  buyerId,
}: PurchasePropertyButtonProps) => {

  const { connection } = useConnection();
  const walletAdapter = useAnchorWallet();
  const { wallet } = useWallet();

  // Check if wallet is connected
  if (!wallet?.adapter.publicKey) {
    return (
      <Button
        variant="contained"
        color="primary"
        sx={{
          width: "100%",
          height: "100%",
          marginTop: 2,
          backgroundColor: "gray",
        }}
        disabled
      >
        Please Connect Wallet
      </Button>
    );
  }

  // Check if required data is available
  if (!displayProperty?.owner?.walletAddress) {
    return (
      <Button
        variant="contained"
        color="primary"
        sx={{
          width: "100%",
          height: "100%",
          marginTop: 2,
          backgroundColor: "red",
        }}
        disabled
      >
        Invalid Property Data
      </Button>
    );
  }

  if (!displayProperty?.property?.tokenAddress) {
    return (
      <Button
        variant="contained"
        color="primary"
        sx={{
          width: "100%",
          height: "100%",
          marginTop: 2,
          backgroundColor: "orange",
        }}
        disabled
      >
        Property Not Tokenized
      </Button>
    );
  }

  if (!walletAdapter) {
    return (
      <Button
        variant="contained"
        color="primary"
        sx={{
          width: "100%",
          height: "100%",
          marginTop: 2,
          backgroundColor: "gray",
        }}
        disabled
      >
        Wallet Not Available
      </Button>
    );
  }

  const provider = new AnchorProvider( connection, walletAdapter, {
    commitment: "confirmed",
  } );
  setProvider( provider );
  
  const program = new Program( idl as Idl, provider );

  const initializeContract = async () => {
    try {
      // Parse and validate keys at call time so we can surface clear errors
      const propertyOwner = displayProperty.owner;
      let sellerPublicKey: PublicKey;
      let buyerPublicKey: PublicKey;
      let propertyTokenPublicKey: PublicKey;

      try {
        sellerPublicKey = new web3.PublicKey(propertyOwner.walletAddress);
      } catch {
        throw new Error("Invalid seller wallet address");
      }
      try {
        buyerPublicKey = wallet.adapter.publicKey as PublicKey;
        if (!buyerPublicKey) throw new Error();
      } catch {
        throw new Error("Buyer wallet not available");
      }
      try {
        propertyTokenPublicKey = new web3.PublicKey(displayProperty.property.tokenAddress);
      } catch {
        throw new Error("Invalid property token address");
      }

      const [smartContractPda] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from("smart_contract")],
        program.programId
      );

      console.log("Program ID:", program.programId.toBase58());
      console.log("Buyer:", buyerPublicKey.toBase58());
      console.log("Seller:", sellerPublicKey.toBase58());
      console.log("Property Token:", propertyTokenPublicKey.toBase58());
      console.log("Contract PDA:", smartContractPda.toBase58());

      const transactionSignature = await program.methods
        .initializeContract()
        .accounts({
          buyer: buyerPublicKey,
          seller: sellerPublicKey,
          propertyToken: propertyTokenPublicKey,
          smartContract: smartContractPda,
          systemProgram: web3.SystemProgram.programId,
        })
        .rpc();

      console.log("Transaction signature:", transactionSignature);
      alert("Contract initialized successfully!");

      /**
       * Create Offer
       */
      const createOfferResult = await fetch(
        `${import.meta.env.VITE_API_URL}/offers`,
        {
          method: "POST",
          body: JSON.stringify({
            propertyId: displayProperty.property.id,
            sellerId: displayProperty.owner.id,
            buyerId: buyerId,
            offerPrice: displayProperty.property.price,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (createOfferResult.ok) {
        const offer: Offer = await createOfferResult.json();
        alert("Offer created successfully!");
      } else {
        alert("Failed to create offer");
      }
    } catch (error) {
      console.error("Error initializing contract:", error);
      alert(`Failed to initialize contract: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <Button
      variant="contained"
      color="primary"
      sx={{
        width: "100%",
        height: "100%",
        marginTop: 2,
        backgroundColor: "black",
      }}
      onClick={() => {
        initializeContract();
      }}
    >
      Purchase Property
    </Button>
  );
};

export default PurchasePropertyButton;
