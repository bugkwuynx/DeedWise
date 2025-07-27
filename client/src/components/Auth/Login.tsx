import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { LoginRequest, LoginResponse } from "../../types/Users";
import {
    Box, Card, CardContent, Typography,
    TextField, Button
} from "@mui/material";

const LoginCard = () => {
    const [ userName, setUserName ] = useState<string>( "" );
    const [ password, setPassword ] = useState<string>( "" );
    const { setToken } = useContext( AuthContext );

    const handleLogin = async () => {
        if ( !userName || !password ) {
            alert( "Please fill in all fields" );
            return;
        }

        const userLoginRequest: LoginRequest = {
            userName,
            password
        };

        const userLoginResponse: Response = await fetch( `${ process.env.REACT_APP_API_URL }/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify( userLoginRequest )
        } );

        if ( userLoginResponse.ok ) {
            const user: LoginResponse = await userLoginResponse.json();
            alert("Login successful");
            setToken( user.token );
            localStorage.setItem( "token", user.token );
            localStorage.setItem( "userId", user.userId );
            window.location.href = "/";
        } else {
            alert("Failed to login");
        }
    };

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
                    height: '500px',
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '8rem',
                } }
            >
                <CardContent
                    sx = { {
                        width: '100%',
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'center',
                        flexDirection: 'column',
                    } }
                >
                    <Box
                        sx = { {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                        } }
                    >
                        <Typography sx={{ fontSize: '1rem' }}>
                            Don&apos;t have an account?
                        </Typography>
                        <Typography
                            component={Link}
                            to="/sign-up"
                            sx={{
                                color: '#434344',
                            }}
                        >
                            Sign up
                        </Typography>
                    </Box>
                    <Box
                        sx = { {
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '2rem',
                            marginTop: '3rem',
                        } }
                    >
                        <TextField
                            label="User Name"
                            variant="outlined"
                            sx={{
                                width: '350px',
                                '& .MuiOutlinedInput-root': {
                                  borderRadius: '5px',
                                },
                            }}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            type="password"
                            sx={{
                                width: '350px',
                            }}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: 'black',
                                color: 'white',
                                width: '350px',
                            }}
                            onClick={handleLogin}
                        >
                            Login
                        </Button>
                    </Box>
                    <Box>
                        <Typography
                            component={Link}
                            to="/forgot-password"
                            sx={{
                                color: '#434344',
                            }}
                        >
                            Forgot Password?
                        </Typography>
                    </Box>
                </CardContent>
            </Card>``
        </Box>
    )
};

export default LoginCard;