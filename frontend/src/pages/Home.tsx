import React, { useContext } from "react";
import { AuthContext } from "../components/Auth/AuthContext.ts";
import HeroSection from "../components/common/HeroSection";

const Home: React.FC = () => {
    const { token, loading } = useContext( AuthContext );

    if ( loading ) {
        return null;
    }

    if ( !token ) {
        return (
            <div>
                <HeroSection />
            </div>
        );
    }

    return (
        <div>
            {/* <Dashboard /> */}
        </div>
    );
};

export default Home;