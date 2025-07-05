import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./ContractDetail.module.css";

const ContractDetail = () => {
    const { id } = useParams();
    const [contract, setContract] = useState(null);
    const [activeTab, setActiveTab] = useState("overview");
    const [paymentConfirmed, setPaymentConfirmed] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    // Mock contract data
    const mockContract = {
        id: id || "CON-2024-001",
        status: "Pending",
        type: "Purchase Agreement",
        createdAt: "2024-01-15",
        expectedCompletion: "2024-03-15",
        buyer: {
            name: "John Smith",
            email: "john.smith@email.com",
            phone: "(555) 123-4567",
            address: "123 Main St, New York, NY 10001"
        },
        seller: {
            name: "Sarah Johnson",
            email: "sarah.johnson@email.com",
            phone: "(555) 987-6543",
            address: "456 Oak Ave, New York, NY 10002"
        },
        property: {
            address: "789 Pine Street, New York, NY 10003",
            type: "Single Family Home",
            bedrooms: 3,
            bathrooms: 2,
            squareFootage: 1800,
            lotSize: "0.25 acres",
            yearBuilt: 1995,
            price: 450000,
            description: "Beautiful family home with modern amenities, updated kitchen, and spacious backyard."
        },
        financialTransaction: {
            totalAmount: 450000,
            earnestMoney: 45000,
            downPayment: 90000,
            remainingBalance: 315000,
            earnestMoneyPaid: true,
            downPaymentPaid: false,
            finalPaymentDue: "2024-03-15",
            smartContractAddress: "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
            transactionHash: null,
            paymentStatus: "pending"
        },
        stages: [
            {
                id: 1,
                name: "Contract Initiation",
                status: "completed",
                completedAt: "2024-01-15",
                tasks: [
                    { id: 1, name: "Contract Draft Created", status: "completed" },
                    { id: 2, name: "Initial Review", status: "completed" }
                ]
            },
            {
                id: 2,
                name: "Document Collection",
                status: "in-progress",
                dueDate: "2024-02-15",
                tasks: [
                    { id: 3, name: "Property Inspection Report", status: "completed" },
                    { id: 4, name: "Title Search", status: "pending" },
                    { id: 6, name: "Home Ownership Confirmation", status: "not started" }
                ]
            },
            {
                id: 3,
                name: "Financing Approval",
                status: "not started",
                dueDate: "2024-02-28",
                tasks: [
                    { id: 7, name: "Funds is in escrow", status: "not started" },
                ]
            },
            {
                id: 4,
                name: "Final Review & Closing",
                status: "not started",
                dueDate: "2024-03-15",
                tasks: [
                    { id: 10, name: "Final Walkthrough", status: "not started" },
                    { id: 11, name: "Closing Documents", status: "not started" },
                    { id: 12, name: "Property Transfer", status: "not started" },
                    { id: 13, name: "Funds is released", status: "not started" }
                ]
            }
        ],
        documents: [
            {
                id: 1,
                name: "Purchase Agreement",
                type: "Contract",
                uploadedAt: "2024-01-15",
                status: "approved",
                size: "2.3 MB"
            },
            {
                id: 2,
                name: "Property Inspection Report",
                type: "Inspection",
                uploadedAt: "2024-01-20",
                status: "approved",
                size: "1.8 MB"
            },
            {
                id: 3,
                name: "Property Survey",
                type: "Survey",
                uploadedAt: "2024-01-25",
                status: "pending",
                size: "3.1 MB"
            }
        ],
        timeline: [
            {
                date: "2024-01-15",
                event: "Contract Created",
                description: "Purchase agreement initiated between buyer and seller"
            },
            {
                date: "2024-01-20",
                event: "Property Inspection Completed",
                description: "Home inspection report submitted and approved"
            },
            {
                date: "2024-01-25",
                event: "Survey Ordered",
                description: "Property survey has been ordered and is in progress"
            }
        ]
    };

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setContract(mockContract);
        }, 500);
    }, [id]);

    const getStatusColor = (status) => {
        switch (status) {
            case "completed": return styles.completed;
            case "in-progress": return styles.inProgress;
            case "pending": return styles.pending;
            default: return styles.pending;
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "completed": return "✓";
            case "in-progress": return "⟳";
            case "pending": return "⏳";
            default: return "⏳";
        }
    };

    const handlePaymentConfirmation = () => {
        setShowConfirmation(true);
    };

    const confirmPayment = () => {
        // Simulate smart contract interaction
        setTimeout(() => {
            setPaymentConfirmed(true);
            setShowConfirmation(false);
            // Update contract with transaction hash
            setContract(prev => ({
                ...prev,
                financialTransaction: {
                    ...prev.financialTransaction,
                    transactionHash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
                    paymentStatus: "completed"
                }
            }));
        }, 2000);
    };

    const cancelPayment = () => {
        setShowConfirmation(false);
    };

    if (!contract) {
        return (
            <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <p>Loading contract details...</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    <h1>Contract #{contract.id}</h1>
                    <p className={styles.contractType}>{contract.type}</p>
                </div>
                <div className={styles.headerRight}>
                    <span className={`${styles.status} ${getStatusColor(contract.status.toLowerCase())}`}>
                        {contract.status}
                    </span>
                    <p className={styles.dates}>
                        Created: {contract.createdAt} | Expected: {contract.expectedCompletion}
                    </p>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className={styles.tabs}>
                <button 
                    className={`${styles.tab} ${activeTab === "overview" ? styles.active : ""}`}
                    onClick={() => setActiveTab("overview")}
                >
                    Overview
                </button>
                <button 
                    className={`${styles.tab} ${activeTab === "stages" ? styles.active : ""}`}
                    onClick={() => setActiveTab("stages")}
                >
                    Stages & Tasks
                </button>
                <button 
                    className={`${styles.tab} ${activeTab === "property" ? styles.active : ""}`}
                    onClick={() => setActiveTab("property")}
                >
                    Property Details
                </button>
                <button 
                    className={`${styles.tab} ${activeTab === "financial" ? styles.active : ""}`}
                    onClick={() => setActiveTab("financial")}
                >
                    Financial Transaction
                </button>
                <button 
                    className={`${styles.tab} ${activeTab === "documents" ? styles.active : ""}`}
                    onClick={() => setActiveTab("documents")}
                >
                    Documents
                </button>
                <button 
                    className={`${styles.tab} ${activeTab === "timeline" ? styles.active : ""}`}
                    onClick={() => setActiveTab("timeline")}
                >
                    Timeline
                </button>
            </div>

            {/* Tab Content */}
            <div className={styles.content}>
                {activeTab === "overview" && (
                    <div className={styles.overview}>
                        <div className={styles.overviewGrid}>
                            <div className={styles.card}>
                                <h3>Buyer Information</h3>
                                <p><strong>Name:</strong> {contract.buyer.name}</p>
                                <p><strong>Email:</strong> {contract.buyer.email}</p>
                                <p><strong>Phone:</strong> {contract.buyer.phone}</p>
                                <p><strong>Address:</strong> {contract.buyer.address}</p>
                            </div>
                            <div className={styles.card}>
                                <h3>Seller Information</h3>
                                <p><strong>Name:</strong> {contract.seller.name}</p>
                                <p><strong>Email:</strong> {contract.seller.email}</p>
                                <p><strong>Phone:</strong> {contract.seller.phone}</p>
                                <p><strong>Address:</strong> {contract.seller.address}</p>
                            </div>
                            <div className={styles.card}>
                                <h3>Property Summary</h3>
                                <p><strong>Address:</strong> {contract.property.address}</p>
                                <p><strong>Type:</strong> {contract.property.type}</p>
                                <p><strong>Price:</strong> ${contract.property.price.toLocaleString()}</p>
                                <p><strong>Size:</strong> {contract.property.squareFootage} sq ft</p>
                            </div>
                            <div className={styles.card}>
                                <h3>Progress Summary</h3>
                                <div className={styles.progressBar}>
                                    <div 
                                        className={styles.progressFill} 
                                        style={{width: `${(contract.stages.filter(s => s.status === "completed").length / contract.stages.length) * 100}%`}}
                                    ></div>
                                </div>
                                <p>{contract.stages.filter(s => s.status === "completed").length} of {contract.stages.length} stages completed</p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "stages" && (
                    <div className={styles.stages}>
                        {contract.stages.map((stage) => (
                            <div key={stage.id} className={`${styles.stage} ${getStatusColor(stage.status)}`}>
                                <div className={styles.stageHeader}>
                                    <h3>
                                        {stage.name}
                                    </h3>
                                    <span className={`${styles.stageStatus}`}>
                                        {stage.status.replace("-", " ")}
                                    </span>
                                </div>
                                {stage.dueDate && (
                                    <p className={styles.dueDate}>Due: {stage.dueDate}</p>
                                )}
                                <div className={styles.tasks}>
                                    {stage.tasks.map((task) => (
                                        <div key={task.id} className={`${styles.task} ${getStatusColor(task.status)}`}>
                                            <span className={styles.taskIcon}>{task.status}</span>
                                            <span className={styles.taskName}>{task.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === "property" && (
                    <div className={styles.property}>
                        <div className={styles.propertyHeader}>
                            <h2>Property Details</h2>
                            <div className={styles.propertyImage}>
                                <div className={styles.imagePlaceholder}>
                                    <span>Property Image</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.propertyGrid}>
                            <div className={styles.propertyInfo}>
                                <h3>Basic Information</h3>
                                <div className={styles.infoGrid}>
                                    <div className={styles.infoItem}>
                                        <label>Address:</label>
                                        <span>{contract.property.address}</span>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <label>Property Type:</label>
                                        <span>{contract.property.type}</span>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <label>Price:</label>
                                        <span>${contract.property.price.toLocaleString()}</span>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <label>Year Built:</label>
                                        <span>{contract.property.yearBuilt}</span>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <label>Bedrooms:</label>
                                        <span>{contract.property.bedrooms}</span>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <label>Bathrooms:</label>
                                        <span>{contract.property.bathrooms}</span>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <label>Square Footage:</label>
                                        <span>{contract.property.squareFootage} sq ft</span>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <label>Lot Size:</label>
                                        <span>{contract.property.lotSize}</span>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.propertyDescription}>
                                <h3>Description</h3>
                                <p>{contract.property.description}</p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "financial" && (
                    <div className={styles.financial}>
                        <div className={styles.financialHeader}>
                            <h2>Financial Transaction</h2>
                            <div className={styles.smartContractInfo}>
                                <p><strong>Smart Contract Address:</strong> {contract.financialTransaction.smartContractAddress}</p>
                                <p><strong>Payment Status:</strong> 
                                    <span className={`${styles.paymentStatus} ${getStatusColor(contract.financialTransaction.paymentStatus)}`}>
                                        {contract.financialTransaction.paymentStatus}
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div className={styles.paymentBreakdown}>
                            <h3>Payment Breakdown</h3>
                            <div className={styles.paymentGrid}>
                                <div className={styles.paymentItem}>
                                    <label>Total Property Price:</label>
                                    <span>${contract.financialTransaction.totalAmount.toLocaleString()}</span>
                                </div>
                                <div className={styles.paymentItem}>
                                    <label>Earnest Money (10%):</label>
                                    <span>
                                        ${contract.financialTransaction.earnestMoney.toLocaleString()} 
                                        <br />{contract.financialTransaction.earnestMoneyPaid ? "Paid" : "Pending"}
                                    </span>
                                </div>
                                <div className={styles.paymentItem}>
                                    <label>Down Payment (20%):</label>
                                    <span>
                                        ${contract.financialTransaction.downPayment.toLocaleString()}
                                        <br />{contract.financialTransaction.downPaymentPaid ? "Paid" : "Pending"}
                                    </span>
                                </div>
                                <div className={styles.paymentItem}>
                                    <label>Remaining Balance:</label>
                                    <span>${contract.financialTransaction.remainingBalance.toLocaleString()}</span>
                                </div>
                                <div className={styles.paymentItem}>
                                    <label>Final Payment Due:</label>
                                    <span>{contract.financialTransaction.finalPaymentDue}</span>
                                </div>
                            </div>
                        </div>

                        {contract.financialTransaction.transactionHash && (
                            <div className={styles.transactionInfo}>
                                <h3>Transaction Details</h3>
                                <div className={styles.transactionHash}>
                                    <label>Transaction Hash:</label>
                                    <span>{contract.financialTransaction.transactionHash}</span>
                                </div>
                                <p className={styles.transactionNote}>
                                    ✓ Payment has been successfully processed and recorded on the blockchain.
                                </p>
                            </div>
                        )}

                        {!contract.financialTransaction.transactionHash && (
                            <div className={styles.paymentActions}>
                                <h3>Confirm Payment</h3>
                                <div className={styles.paymentWarning}>
                                    <p>⚠️ Please review all payment details carefully before confirming. This action will:</p>
                                    <ul>
                                        <li>Transfer ${contract.financialTransaction.downPayment.toLocaleString()} to the smart contract</li>
                                        <li>Lock the funds until closing conditions are met</li>
                                        <li>Record the transaction on the blockchain</li>
                                    </ul>
                                </div>
                                <button 
                                    className={styles.confirmPaymentButton}
                                    onClick={handlePaymentConfirmation}
                                    disabled={paymentConfirmed}
                                >
                                    {paymentConfirmed ? "Processing..." : "Confirm Payment"}
                                </button>
                            </div>
                        )}

                        {showConfirmation && (
                            <div className={styles.confirmationModal}>
                                <div className={styles.confirmationContent}>
                                    <h3>Confirm Payment</h3>
                                    <p>Are you sure you want to proceed with the payment of <strong>${contract.financialTransaction.downPayment.toLocaleString()}</strong>?</p>
                                    <div className={styles.confirmationButtons}>
                                        <button 
                                            className={styles.confirmButton}
                                            onClick={confirmPayment}
                                        >
                                            Yes, Confirm Payment
                                        </button>
                                        <button 
                                            className={styles.cancelButton}
                                            onClick={cancelPayment}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === "documents" && (
                    <div className={styles.documents}>
                        <div className={styles.documentsHeader}>
                            <h2>Documents</h2>
                            <button className={styles.uploadButton}>Upload Document</button>
                        </div>
                        <div className={styles.documentList}>
                            {contract.documents.map((doc) => (
                                <div key={doc.id} className={`${styles.document} ${getStatusColor(doc.status)}`}>
                                    <div className={styles.documentInfo}>
                                        <h4>{doc.name}</h4>
                                        <p className={styles.documentMeta}>
                                            {doc.type} • {doc.size} • Uploaded {doc.uploadedAt}
                                        </p>
                                    </div>
                                    <div className={styles.documentActions}>
                                        <span className={`${styles.documentStatus} ${getStatusColor(doc.status)}`}>
                                            {doc.status}
                                        </span>
                                        <button className={styles.downloadButton}>Download</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === "timeline" && (
                    <div className={styles.timeline}>
                        <h2>Contract Timeline</h2>
                        <div className={styles.timelineList}>
                            {contract.timeline.map((event, index) => (
                                <div key={index} className={styles.timelineItem}>
                                    <div className={styles.timelineDate}>
                                        <span>{event.date}</span>
                                    </div>
                                    <div className={styles.timelineContent}>
                                        <h4>{event.event}</h4>
                                        <p>{event.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContractDetail;