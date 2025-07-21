import React, { useState, useContext } from "react";
import styles from "./LoginCard.module.css";
import propertyLogin from "../../../assets/login.jpg";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const LoginCard = () => {
    const navigate = useNavigate();

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const { setToken } = useContext( AuthContext );

    const handleLogin = async () => {
        if ( !userName || !password ) {
            alert("Please fill in all fields");
            return;
        }

        const user = {
            userName,
            password
        };

        const response = await fetch( `${ import.meta.env.VITE_API_URL }/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify( user )
        } );

        if ( response.ok ) {
            alert("Login successful");
            setToken( response.token );
            localStorage.setItem( "token", response.token );
            window.location.href = "/";
        } else {
            alert("Failed to login");
        }
    }

    return (
        <div className={styles.loginContainer}>
            <div className={styles.imageContainer}>
                <img
                    src={propertyLogin}
                    alt="propertyLogin"
                    className={styles.backgroundImage}
                />
            </div>
            <div className={styles.loginForm}>
                <div className={styles.loginTitle}>
                    Login
                </div>
                <div className={styles.loginDescription}>
                    Don&apos;t have an account? 
                    <Link to="/signup" className={styles.signupLink}>
                        Sign up
                    </Link>
                </div>
                <div className={styles.inputContainer}>
                    <div className={styles.inputOuterContainer}>
                        <input
                            type="text"
                            placeholder="User Name"
                            className={styles.input}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputOuterContainer}>
                        <input
                            type="password"
                            placeholder="Password"
                            className={styles.input}
                            onChange={(e) => setPassword(e.target.value)}
                        /> 
                    </div>
                    <div className={styles.forgotPasswordContainer}>
                        <Link to="/forgotpassword" className={styles.forgotPasswordLink}>
                            Forgot Password?
                        </Link>
                    </div>
                </div>
                <div className={styles.loginButtonOuterContainer}>
                    <div className={styles.loginButtonContainer}>
                        <button
                            className={styles.loginButton}
                            onClick={handleLogin}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginCard;