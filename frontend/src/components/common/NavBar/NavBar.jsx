import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css"
import { AuthContext } from "../../Auth/AuthContext";

const NavBar = () => {

  const { token, loading, setToken } = useContext( AuthContext );

  if ( loading ) {
    return null;
  }

  const isLoggedIn = !!token;

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
        { !isLoggedIn ? (
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
                  setToken( null );
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