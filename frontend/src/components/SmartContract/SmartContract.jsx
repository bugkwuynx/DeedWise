import React from "react";
import styles from "./SmartContract.module.css";

const ProcessSteps = () => {
    const steps = [
        {
            number: "01",
            title: "Find the property you want to purchase",
            description: "Browse our extensive property listings to find your ideal investment"
        },
        {
            number: "02", 
            title: "Check property details",
            description: "Review comprehensive property information and documentation"
        },
        {
            number: "03",
            title: "Enter your information", 
            description: "Provide your details and transaction requirements"
        },
        {
            number: "04",
            title: "Deploy your smart contract",
            description: "Execute the automated, trustless agreement on the blockchain"
        }
    ];

    return (
        <div className={styles.processStepsContainer}>
            <div className={styles.processStepsTitle}>
                How It Works
            </div>
            <div className={styles.stepsGrid}>
                {steps.map((step, index) => (
                    <div key={index} className={styles.stepCard}>
                        <div className={styles.stepNumber}>{step.number}</div>
                        <div className={styles.stepContent}>
                            <h3 className={styles.stepTitle}>{step.title}</h3>
                            <p className={styles.stepDescription}>{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const SmartContractCard = () => {
    return (
        <div className={styles.smartContractContainer}>
            <div className={styles.smartContractTitle}>
                Deploy Your Smart Contract
            </div>
            <div className={styles.smartContractDescription}>
                Deploying a smart contract on our platform lets you create automated, trustless agreements tailored for real estate transactions.
            </div>
            <ProcessSteps />
            <div className={styles.action}>
                <div className={styles.actionTitle}>
                    Ready to get started? You are 
                </div>
                <button className={styles.actionButton} onClick={() => {
                    window.location.href = "/smart-contract/seller/stage-1";
                }}>
                    Seller
                </button>
                <button className={styles.actionButton} onClick={() => {
                    window.location.href = "/smart-contract/buyer/stage-1";
                }}>
                    Buyer
                </button>
            </div>
        </div>
    );
};

export default SmartContractCard;