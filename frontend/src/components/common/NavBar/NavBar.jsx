import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css"

const NavBar = () => {

  const [ isLoggedIn, setIsLoggedIn ] = useState(false);

  useEffect( () => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [] );

  return (
    <div className={styles.navContainer}>
      <div className={styles.navbarComponent}>
        <div className={styles.deedwiseTitle}>
          DeedWise
        </div>
        <div className={styles.mainNavComponent}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${styles.mainNav} ${styles.activeNav}` : styles.mainNav
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/smart-contract"
            className={({ isActive }) =>
              isActive ? `${styles.mainNav} ${styles.activeNav}` : styles.mainNav
            }
          >
            Smart Contract
          </NavLink>
          <NavLink
            to="/account"
            className={({ isActive }) =>
              isActive ? `${styles.mainNav} ${styles.activeNav}` : styles.mainNav
            }
          >
            Account
          </NavLink>
        </div>
        { isLoggedIn ? (
            <div>
              <button
                className={styles.authNav}
                onClick={() => {
                  window.location.href = "/login";
                }}
              >
                Login
              </button>
              <button
                className={styles.authNav}
                onClick={() => {
                  window.location.href = "/signup";
                }}
              >
                Signup
              </button>
            </div>
          ) : (
            <div>
              <button
                className={styles.authNav}
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/";
                }}
              >
                Logout
              </button>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default NavBar;