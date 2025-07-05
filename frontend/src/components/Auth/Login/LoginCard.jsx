import React, { useState } from "react";
import styles from "./LoginCard.module.css";
import propertyLogin from "../../../assets/login.jpg";
import { Link } from "react-router-dom";

const LoginCard = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
                            placeholder="Email"
                            className={styles.input}
                            onChange={(e) => setEmail(e.target.value)}
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
                        <button className={styles.loginButton}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginCard;