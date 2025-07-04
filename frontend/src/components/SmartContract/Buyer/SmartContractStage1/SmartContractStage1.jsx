import React, { useState } from "react";
import styles from "./SmartContractStage1.module.css";
import data from "../../../../../data.json";
import { useNavigate } from "react-router-dom";

const SmartContractStage1Component = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        zipCode: ""
    });

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <div className={styles.smartContractStage1Container}>
            <div className={styles.smartContractStage1Card}>
                <div className={styles.smartContractStage1Title}>
                    Property Address
                </div>
                <div className={styles.smartContractStage1InputContainer}>
                    <div className={styles.smartContractStage1Input}>
                        <input
                            type="text"
                            placeholder="Address Line 1"
                            className={styles.smartContractStage1InputField}
                            value={formData.addressLine1}
                            onChange={(e) => handleInputChange("addressLine1", e.target.value)}
                        />
                    </div>
                    <div className={styles.smartContractStage1Input}>
                        <input
                            type="text"
                            placeholder="Address Line 2 (Optional)"
                            className={styles.smartContractStage1InputField}
                            value={formData.addressLine2}
                            onChange={(e) => handleInputChange("addressLine2", e.target.value)}
                        />
                    </div>
                    <div className={styles.addressContainer}>
                        <div className={styles.smartContractStage1Input}>
                            <input
                                type="text"
                                placeholder="City"
                                className={styles.smartContractStage1InputField}
                                value={formData.city}
                                onChange={(e) => handleInputChange("city", e.target.value)}
                            />
                        </div>
                        <div className={styles.smartContractStage1Input}>
                            <select
                                className={`${styles.smartContractStage1InputField} ${styles.stateSelect}`}
                                value={formData.state}
                                onChange={(e) => handleInputChange("state", e.target.value)}
                            >
                                <option value="">Select State</option>
                                {data.states.map((state) => (
                                    <option key={state} value={state}>
                                        {state}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.smartContractStage1Input}>
                            <input
                                type="text"
                                placeholder="Zip Code"
                                className={styles.smartContractStage1InputField}
                                value={formData.zipCode}
                                onChange={(e) => handleInputChange("zipCode", e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.addressButtonContainer}>
                    <button className={styles.addressButton}>
                        Enter
                    </button>
                </div>
            </div>
            <div className={styles.propertyDetailsContainer}>
                <div className={styles.propertyDetailsTitle}>
                    Property Details
                </div>
                <div className={styles.propertyDetailsButtonContainer}>
                    <button
                        className={styles.propertyDetailsButton}
                        onClick={() => {
                            navigate("/smart-contract/buyer/stage-2");
                        }}
                    >
                        Next Step
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SmartContractStage1Component;