import React, { useState, useEffect } from "react";
import HeroSection from "../components/common/HeroSection/HeroSection";
import NavBar from "../components/common/NavBar/NavBar";
import Dashboard from "../components/Dashboard/Dashboard";

const Home = () => {

  const [ isLoggedIn, setIsLoggedIn ] = useState(true);

  // useEffect( () => {
  //   const token = localStorage.getItem("token");
  //   setIsLoggedIn(!!token);
  // }, [] );

  return (
    <div>
      <NavBar />
      { console.log(isLoggedIn) }
      { isLoggedIn ? <Dashboard /> : <HeroSection /> }
    </div>
  );
};

export default Home;