import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContextType } from "../../types/AuthContext";

export const AuthContext = createContext<AuthContextType>({
    token: null,
    setToken: () => {},
    userId: null,
    setUserId: () => {},
    loading: true
});

export const AuthProvider = ( { children }: { children: React.ReactNode } ) => {
    const [ token, setToken ] = useState<string | null>( null );
    const [ userId, setUserId ] = useState<string | null>( null );
    const [ loading, setLoading ] = useState( true );

    useEffect( () => {
        const storedToken = localStorage.getItem( "token" );
        const storedUserId = localStorage.getItem( "userId" );
        setToken( storedToken );
        setUserId( storedUserId );
        setLoading( false );
    }, [] );

    return (
        <AuthContext.Provider value = { { token, setToken, userId, setUserId, loading} }>
            { children }
        </AuthContext.Provider>
    )
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};