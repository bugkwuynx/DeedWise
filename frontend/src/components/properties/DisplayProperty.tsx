import type { Property } from "../../types/Properties";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import PurchasePropertyButton from "./PurchasePropertyButton";
import { Connection, PublicKey, SystemProgram } from "@solana/web3.js";
import { Program, AnchorProvider } from "@project-serum/anchor";
import idl from "../../../../smart-contract/target/idl/smart_contract.json";
import { useWallet } from "@solana/wallet-adapter-react";
import BN from "bn.js";
import type { User } from "../../types/Users";
import { ContractStatus } from "../../types/Contract";

interface DisplayPropertyProps {
  propertyId: Property["id"];
}

const programId = new PublicKey(idl.address);
const network = "https://api.devnet.solana.com";

const DisplayProperty = ({ propertyId }: DisplayPropertyProps) => {

  const wallet = useWallet();
  const [program, setProgram] = useState<Program | null>(null);
  const [sellerAddress, setSellerAddress] = useState<PublicKey | null>(null);
  const [propertyAddress, setPropertyAddress] = useState<PublicKey | null>(null);
  const [propertyOwner, setPropertyOwner] = useState<User | null>(null);

  const [property, setProperty] = useState<Property | null>(null);

  const fetchData = async (propertyId: string) => {
    if (!propertyId) {
      return;
    }

    const getPropertyDisplayResult = await fetch(`${import.meta.env.VITE_API_URL}/properties/${propertyId}/display`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (getPropertyDisplayResult.ok) {
      const propertyDisplay = await getPropertyDisplayResult.json();
      setProperty(propertyDisplay.property);
      setPropertyOwner(propertyDisplay.owner);
    }
  };

  const fetchPropertyAddress = async (propertyId: string) => {
    if (!program || !sellerAddress) {
      return;
    }

    const [propertyAddress] = PublicKey.findProgramAddressSync(
      [
        Buffer.from("property"),
        sellerAddress.toBuffer(),
        new BN(propertyId).toArrayLike(Buffer, "le", 8),
      ],
      program.programId
    );

    setPropertyAddress(propertyAddress);
  }

  const initializeContract = async () => {
    if (!program || !sellerAddress) {
      return;
    }

    const buyerPubkey = new PublicKey(wallet);
    const sellerPubkey = sellerAddress;
    const propertyPubkey = propertyAddress;

    if (!buyerPubkey || !sellerPubkey || !propertyPubkey) {
      alert("Error initializing contract");
      return;
    }

    const [contractPDA, _bump] = await PublicKey.findProgramAddressSync(
      [Buffer.from("contract"), buyerPubkey.toBuffer()],
      program.programId
    );

    try {
      await program.methods
        .initializeContract(
          buyerPubkey,
          sellerPubkey,
          propertyPubkey,
          new BN(ContractStatus.WaitingForSeller)
        )
        .accounts({
          buyer: buyerPubkey,
          smartContract: contractPDA,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      alert("Contract initialized successfully");
    } catch (error) {
      console.error(error);
      alert("Error initializing contract");
    }
  };

  useEffect(() => {
    fetchData(propertyId);

    if (!wallet.connected) {
      alert("Please connect your wallet");
      return;
    };
    const connection = new Connection(network);
    const provider = new AnchorProvider(connection, wallet, {});
    const program = new Program(idl, programId, provider);
    setProgram(program);
    fetchPropertyAddress(propertyId);
    if (propertyOwner?.walletAddress) {
      const sellerPubKey = new PublicKey(propertyOwner.walletAddress);
      setSellerAddress(sellerPubKey);
    }
    else {
      alert("Property owner not found");
    }
  }, [propertyId, wallet]);

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
        <Card
          sx={{
            width: "50%",
            height: "70%",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            margin: "auto",
            marginTop: 10,
          }}
        >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
              }}
            >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Property Details
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    height: "100%",
                    marginTop: 4,
                    gap: 2,
                  }}
                >
                  <Typography variant="h6"><b>Price:</b> {property.price || "N/A"}</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      height: "100%",
                      gap: 10,
                    }}
                  >
                    <Typography variant="h6"><b>Beds:</b> {property.beds || "N/A"}</Typography>
                    <Typography variant="h6"><b>Baths:</b> {property.baths || "N/A"}</Typography>
                    <Typography variant="h6"><b>Sqft:</b> {property.sqft || "N/A"}</Typography>
                  </Box>
                  <Typography variant="h6"><b>Address:</b> {property.address || "N/A"}</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      height: "100%",
                      gap: 10,
                    }}
                  >
                    <Typography variant="h6"><b>City:</b> {property.city || "N/A"}</Typography>
                    <Typography variant="h6"><b>State:</b> {property.state || "N/A"}</Typography>
                    <Typography variant="h6"><b>Zip Code:</b> {property.zipCode || "N/A"}</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      height: "100%",
                      gap: 10,
                    }}
                  >
                    <Typography variant="h6"><b>Property Type:</b> {property.propertyType || "N/A"}</Typography>
                    <Typography variant="h6"><b>Year Built:</b> {property.yearBuilt || "N/A"}</Typography>
                  </Box>
                  <PurchasePropertyButton propertyId={propertyId} />
                </Box>
            </CardContent>
        </Card>
    </Box>
  );
};

export default DisplayProperty;