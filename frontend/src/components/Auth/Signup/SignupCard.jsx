import React, { useState } from "react";
import styles from "./SignupCard.module.css";
import signup from "../../../assets/signup.jpg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignupCard = () => {

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [walletAddress, setWalletAddress] = useState("");
    const [userName, setUserName] = useState("");

    const handleSignup = async () => {
        if ( !firstName || !lastName || !email || !password || !walletAddress || !userName ) {
            alert("Please fill in all fields");
            return;
        }

        const newUser = {
            walletAddress,
            firstName,
            lastName,
            userName,
            email,
            password
        };

        const response = await fetch( `${ import.meta.env.VITE_API_URL }/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify( newUser )
        } );

        if ( response.ok ) {
            alert("User created successfully");
            navigate("/login");
        } else {
            alert("Failed to create user");
        }
    }

    return (
        <div className={styles.signupContainer}>
            <div className={styles.signupForm}>
                <div className={styles.signupTitle}>
                    Create an Account
                </div>
                <div className={styles.signupDescription}>
                    Already have an account? 
                    <Link to="/login" className={styles.loginLink}>
                        Login
                    </Link>
                </div>
                <div className={styles.inputContainer}>
                    <div className={styles.nameInputContainer}>
                        <div className={styles.inputOuterContainer}>
                            <input
                                type="text"
                                placeholder="First Name"
                                className={styles.input}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className={styles.inputOuterContainer}>
                            <input
                                type="text"
                                placeholder="Last Name"
                                className={styles.input}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={styles.inputOuterContainer}>
                        <input
                            type="text"
                            placeholder="Wallet Address"
                            className={styles.input}
                            onChange={(e) => setWalletAddress(e.target.value)}
                        />
                    </div>
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
                </div>
                <div className={styles.signupButtonOuterContainer}>
                    <div className={styles.signupButtonContainer}>
                        <button
                            className={styles.signupButton}
                            onClick={handleSignup}
                        >
                            Create Account
                        </button>
                    </div>
                </div>
            </div>
            <div className={styles.imageContainer}>
                <img
                    src={signup}
                    alt="propertySignup"
                    className={styles.backgroundImage}
                />
            </div>
        </div>
    )
}

export default SignupCard;