import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState( null );
    const [loading, setLoading] = useState( true );

    useEffect(() => {
        const storedToken = localStorage.getItem( "token" );
        setToken( storedToken );
        setLoading( false );
    }, []);

    return (
        <AuthContext.Provider value={{ token, setToken, loading }}>
            {children}
        </AuthContext.Provider>
    )
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};
