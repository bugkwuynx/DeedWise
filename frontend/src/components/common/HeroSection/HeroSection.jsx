import React from "react";
import styles from "./HeroSection.module.css";

const HeroSection = () => {
    return (
        <div className={styles.heroSection} style={{ position: 'relative', overflow: 'hidden' }}>
            <div className={styles.glowEffect}></div>
            {/* Glow effect background */}
            <div className={styles.headLine}>
                Secure, Transparent Property Transactions 
                <br /> Verified on Blockchain
            </div>
            <div className={styles.subHeadLine}>
                Buy, sell, and verify property ownership with confidence — no lawyers, no paperwork, 
                <br /> just smart contracts and AI document assistance.
            </div>
            <div className={styles.actionContainer}>
                <button
                    className={styles.getStartedButton}
                    onClick={() => {
                        window.location.href = "/signup";
                    }}
                >
                    Get Started
                </button>
            </div>
        </div>
    );
};

export default HeroSection;