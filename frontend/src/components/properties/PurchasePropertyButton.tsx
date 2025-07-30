import { Button } from "@mui/material";
import {
    Connection,
    PublicKey,
    Transaction,
    TransactionInstruction,
    sendAndConfirmTransaction,
} from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';

interface PurchasePropertyButtonProps {
  propertyId: string;
}

const PurchasePropertyButton = ({ propertyId }: PurchasePropertyButtonProps) => {
    const { publicKey, signTransaction } = useWallet();
    const connection = new Connection("https://api.devnet.solana.com");
    
    const programId = new PublicKey("HDfR1vrZ4dQhw3J71rumdreZjt3hg8ooEXBbKsUbiria");
    const contractAccount = new PublicKey("")

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
            console.log(propertyId);
        }}
        >
        Purchase Property
        </Button>
  ) ;
};

export default PurchasePropertyButton;