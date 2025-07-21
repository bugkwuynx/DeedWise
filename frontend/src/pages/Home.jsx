import React, { useContext } from "react";
import HeroSection from "../components/common/HeroSection/HeroSection";
import NavBar from "../components/common/NavBar/NavBar";
import Dashboard from "../components/Dashboard/Dashboard";
import { AuthContext } from "../components/Auth/AuthContext";

const Home = () => {

  const { token, loading } = useContext( AuthContext );

  if ( loading ) {
    return null;
  }

  if ( !token ) {
    return (
      <div>
        <NavBar />
        <HeroSection />
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <Dashboard />
    </div>
  );
};

export default Home;