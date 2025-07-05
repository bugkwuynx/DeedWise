import React, { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";

const ActiveContractsPurchase = () => {

    const [ activeContracts, setActiveContracts ] = useState([]);

    useEffect( () => {
        const activeContractArray = [
            {
                id: 1,
                address: "408 S Locus St, Greencastle, IN 46135",
                status: "Active",
                createdAt: "2025-01-01",
                price: "$100,000",
                currentStage: "Inspection Pending"
            }
        ];

        setActiveContracts(activeContractArray);
    }, [] );

    return (
        <div className={styles.activeContractWrapper}>
            <div
                className={styles.activeContractTitle}
            >
                Contracts You&apos;re Purchasing
            </div>
            <div className={styles.contractsGrid}>
                { activeContracts.map( (contract, index) => (
                    <div
                        key={index}
                        className={styles.contractContainer}
                    >
                        <div className={styles.contractDetails}>
                            <div
                                className={styles.contractAddress}
                            >
                                <b>{ contract.address }</b>
                            </div>
                            <div>Status: <b>{ contract.status }</b></div>
                            <div>Price: <b>{ contract.price }</b></div>
                            <div>Current Stage: <b>{ contract.currentStage }</b></div>
                            <div>Created At: <b>{ contract.createdAt }</b></div>
                        </div>
                        <div className={styles.contractActions}>
                            <button
                                onClick={ () => {
                                    window.open( `/contract/buyer/${contract.id}` );
                                } }
                            >View Contract</button>
                        </div>
                    </div>
                ) ) }
            </div>
        </div>
    );
}

const ActiveContractsSale = () => {

    const [ activeContracts, setActiveContracts ] = useState([]);

    useEffect( () => {
        const activeContractArray = [
            {
                id: 1,
                address: "408 S Locus St, Greencastle, IN 46135",
                status: "Active",
                createdAt: "2025-01-01",
                price: "$100,000",
                currentStage: "Inspection Pending"
            }
        ];

        setActiveContracts(activeContractArray);
    }, [] );

    return (
        <div className={styles.activeContractWrapper}>
            <div
                className={styles.activeContractTitle}
            >
                Contracts You&apos;re Selling
            </div>
            <div className={styles.contractsGrid}>
                { activeContracts.map( (contract, index) => (
                    <div
                        key={index}
                        className={styles.contractContainer}
                    >
                        <div className={styles.contractDetails}>
                            <div
                                className={styles.contractAddress}
                            >
                                <b>{ contract.address }</b>
                            </div>
                            <div>Status: <b>{ contract.status }</b></div>
                            <div>Price: <b>{ contract.price }</b></div>
                            <div>Current Stage: <b>{ contract.currentStage }</b></div>
                            <div>Created At: <b>{ contract.createdAt }</b></div>
                        </div>
                        <div className={styles.contractActions}>
                            <button
                                onClick={ () => {
                                    window.open( `/contract/seller/${contract.id}` );
                                } }
                            >View Contract</button>
                        </div>
                    </div>
                ) ) }
            </div>
        </div>
    );
}


const Dashboard = () => {
    return (
        <div className={styles.dashboardWrapper}>
            <div className={styles.dashboardContainer}>
                <div>Your Active Contracts</div>
            </div>
            <div className={styles.dashboardContent}>
                <ActiveContractsPurchase />
                <ActiveContractsSale />
            </div>
        </div>
    );
};

export default Dashboard;