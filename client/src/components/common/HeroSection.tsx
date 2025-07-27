import { Box, Button, Typography } from "@mui/material";
import React from "react";

const HeroSection: React.FC = () => {
    return (
        <Box>
            <Typography
                sx = { {
                    fontSize: '3.7rem',
                    fontWeight: 800,
                    color: 'black',
                    textAlign: 'center',
                    marginTop: '8rem',
                } }
            >
                Secure, Transparent Property Transactions
                <br />
                Verified on Blockchain
            </Typography>
            <Typography
                sx = { {
                    fontSize: '1.3rem',
                    color: 'black',
                    textAlign: 'center',
                    marginTop: '1rem',
                } }
            >
                Buy, sell, and verify property ownership with confidence — no lawyers, no paperwork, 
                <br /> just smart contracts and AI document assistance.
            </Typography>
            <Box
                sx = { {
                    display: 'flex',
                    justifyContent: 'center',
                    height: '100%',
                } }
            >
                <Button
                    variant="contained"
                    sx = { {
                        backgroundColor: 'black',
                        color: 'white',
                        fontWeight: 500,
                        fontSize: '1rem',
                        borderRadius: '0.9rem',
                        textTransform: 'none',
                        marginTop: '3rem',
                        '&:hover': {
                            boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                        },
                    } }
                    onClick = { () => {
                        window.location.href = '/login';
                    } }
                >
                    Get Started
                </Button>
            </Box>
        </Box>
    )
};

export default HeroSection;