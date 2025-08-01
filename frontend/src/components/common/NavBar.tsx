import React, { useContext, useState } from "react";
import { AuthContext } from "../Auth/AuthContext.ts";
import type { AuthContextType } from "../../types/AuthContext.ts";
// MUI Components
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import '@solana/wallet-adapter-react-ui/styles.css';

const pages = [ 'Home', 'Smart Contract', 'Account' ];
const routes = [ '/', '/smart-contract', '/account' ];
const settings = [ 'Profile', 'Account', 'Dashboard', 'Logout' ];

const NavBar: React.FC = () => {
    const { token, loading, setToken } = useContext<AuthContextType>( AuthContext );

    const [ anchorElNav, setAnchorElNav ] = useState<null | HTMLElement>( null );
    const [ anchorElUser, setAnchorElUser ] = useState<null | HTMLElement>( null );

    const handleOpenNavMenu = ( event: React.MouseEvent<HTMLElement> ) => {
        setAnchorElNav( event.currentTarget );
    };

    const handleOpenUserMenu = ( event: React.MouseEvent<HTMLElement> ) => {
        setAnchorElUser( event.currentTarget );
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav( null );
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser( null );
    };

    if ( loading ) {
        return null;
    }

    const isLoggedIn = !!token;

    return (
        <AppBar
            position="static"
            sx = { {
                backgroundColor: 'black',
            } }
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx = { {
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        } }
                    >
                        DEEDWISE
                    </Typography>
                    <Box sx = { { flexGrow: 1, display: { xs: 'flex', md: 'none' } } }>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={ handleOpenNavMenu }
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={ anchorElNav }
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={ Boolean( anchorElNav ) }
                            onClose={ handleCloseNavMenu }
                            sx = { {
                                display: { xs: 'block', md: 'none' },
                            } }
                        >
                            { pages.map( ( page ) => (
                                <MenuItem key={ page } onClick={ handleCloseNavMenu }>
                                    <Typography textAlign="center">{ page }</Typography>
                                </MenuItem>
                            ) ) }
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        DEEDWISE
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        { pages.map( ( page ) => (
                            <Button
                                key={ page }
                                onClick={ () => {
                                    window.location.href = routes[ pages.indexOf( page ) ];
                                } }
                                sx = { {
                                    my: 2,
                                    color: 'white',
                                    display: 'block',
                                } }
                            >
                                { page }
                            </Button>
                        ) ) }
                    </Box>
                    <Box sx={ { flexGrow: 0 } }>
                        { isLoggedIn ? (
                            <Box
                                sx = { {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                } }
                            >
                                <WalletMultiButton 
                                    style = { {
                                        backgroundColor: 'white',
                                        color: 'black',
                                        borderRadius: '10px',
                                        padding: '5x 10px',
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                        width: '150px',
                                        height: '40px',
                                    } }
                                />
                                <Button
                                    onClick={ () => {
                                        localStorage.removeItem( 'token' );
                                        setToken( null );
                                        window.location.href = '/';
                                    } }
                                    sx = { {
                                        my: 2,
                                        color: 'white',
                                        display: 'block',
                                    } }
                                >
                                    Logout
                                </Button>
                                <Box sx={{ flexGrow: 0 }}>
                                    <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="User" src="../../accountCircle" />
                                    </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        {settings.map((setting) => (
                                            <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                            <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </Box>
                            </Box>
                        ) : (
                            <Box sx = { { flexGrow: 0, display: { xs: 'none', md: 'flex' } } }>
                                <Button
                                    onClick={ () => {
                                        window.location.href = '/login';
                                    } }
                                    sx = { {
                                        my: 2,
                                        color: 'white',
                                        display: 'block',
                                    } }
                                >
                                    Login
                                </Button>
                                <Button
                                    onClick={ () => {
                                        window.location.href = '/signup';
                                    } }
                                    sx = { {
                                        my: 2,
                                        color: 'white',
                                        display: 'block',
                                    } }
                                >
                                    Signup
                                </Button>
                            </Box>    
                        ) }
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default NavBar;