import React, { useState } from "react";
import styles from "./SignupCard.module.css";
import propertySignup from "../../../assets/propertySignup.JPG";
import { Link } from "react-router-dom";

const SignupCard = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
                        <button className={styles.signupButton}>Create Account</button>
                    </div>
                </div>
            </div>
            <div className={styles.imageContainer}>
                <img
                    src={propertySignup}
                    alt="propertySignup"
                    className={styles.backgroundImage}
                />
            </div>
        </div>
    )
}

export default SignupCard;