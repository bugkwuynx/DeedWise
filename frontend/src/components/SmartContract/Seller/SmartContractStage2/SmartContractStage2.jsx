import React from "react";
import styles from "./SmartContractStage2.module.css";

const SmartContractStage2Component = () => {
    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <div className={styles.title}>
                    Contract Details
                </div>
            </div>
            <div className={styles.inputField}>
                <div className={styles.inputContainer}>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Buyer Address"
                    />
                </div>
                <div className={styles.inputContainer}>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Seller Address"
                    />
                </div>     
                <div className={styles.inputContainer}>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Purchase Price"
                    />
                </div>         
                <div className={styles.inputOuterContainer}>
                    <div className={styles.inputContainer}>
                        <input
                            className={styles.input}
                            type="date"
                            placeholder="Inspection Date"
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <input
                            className={styles.input}
                            type="date"
                            placeholder="Closing Date"
                        />
                    </div>
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.actionButton}>
                    Deploy Contract
                </button>
                <button className={styles.actionButton}>
                    Back
                </button>
            </div>
        </div>
    );
};

export default SmartContractStage2Component;
