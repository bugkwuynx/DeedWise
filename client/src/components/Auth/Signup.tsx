import { Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { NewUser, SignupRequest } from "../../types/Users";

const Signup = () => {

    const navigate: NavigateFunction = useNavigate();
    
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [walletAddress, setWalletAddress] = useState<string>("");
    const [userName, setUserName] = useState<string>("");

    const handleSignup = async () => {
        if ( !firstName || !lastName || !email || !password || !walletAddress || !userName ) {
            alert("Please fill in all fields");
            return;
        }

        const newUser: SignupRequest = {
            walletAddress,
            firstName,
            lastName,
            userName,
            email,
            password
        };

        const response: Response = await fetch( `${ process.env.REACT_APP_API_URL }/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify( newUser )
        } );

        if ( response.ok ) {
            alert("User created successfully");
            navigate("/login");
        } else {
            alert("Failed to create user");
        }
    }

    return (
        <Box
            sx = { {
                display: 'flex',
                justifyContent: 'center',
                height: '100vh',
                width: '100vw',
            } }
        >
            <Card
                sx = { {
                    width: '500px',
                    height: '600px',
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '6rem',
                } }
            >
                <CardContent
                    sx = { {
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                    } }
                >
                    <Typography variant="h4">
                        Create an Account
                    </Typography>
                    <Box
                        sx = { {
                            display: 'flex',
                            gap: '0.5rem',
                        } }
                    >
                        <Typography variant="body1">
                            Already have an account? 
                        </Typography>
                        <Typography
                            component={Link}
                            to="/login"                            
                        >
                            Login
                        </Typography>
                    </Box>
                    <Box
                        sx = { {
                            display: 'flex',
                            gap: '1rem',
                            marginTop: '1.5rem',
                            flexDirection: 'column',
                        } }
                    >
                        <Box
                            sx = { {
                                display: 'flex',
                                gap: '1rem',
                            } }
                        >
                            <TextField
                                label="First Name"
                                variant="outlined"
                                sx = { {
                                    width: '200px',
                                } }
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <TextField
                                label="Last Name"
                                variant="outlined"
                                sx = { {
                                    width: '200px',
                                } }
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Box>
                        <TextField
                            label="Email"
                            variant="outlined"
                            sx = { {
                                width: '416px',
                            } }
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            label="Wallet Address"
                            variant="outlined"
                            sx = { {
                                width: '416px',
                            } }
                            onChange={(e) => setWalletAddress(e.target.value)}
                        />
                        <TextField
                            label="User Name"
                            variant="outlined"
                            sx = { {
                                width: '416px',
                            } }
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            type="password"
                            sx = { {
                                width: '416px',
                            } }
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            sx = { {
                                width: '416px',
                                backgroundColor: 'black',
                                color: 'white',
                            } }
                            onClick={handleSignup}
                        >
                            Signup
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Signup;