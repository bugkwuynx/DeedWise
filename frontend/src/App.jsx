import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import {
  SmartContract,
  BuyerSmartContractStage1,
  BuyerSmartContractStage2,
  SellerSmartContractStage1,
  SellerSmartContractStage2
} from "./pages/SmartContract";
import { ContractDetailPageBuyer, ContractDetailPageSeller } from "./pages/ContractDetail";


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/smart-contract" element={<SmartContract />} />
        <Route path="/smart-contract/buyer/stage-1" element={<BuyerSmartContractStage1 />} />
        <Route path="/smart-contract/buyer/stage-2" element={<BuyerSmartContractStage2 />} />
        <Route path="/smart-contract/seller/stage-1" element={<SellerSmartContractStage1 />} />
        <Route path="/smart-contract/seller/stage-2" element={<SellerSmartContractStage2 />} />
        <Route path="/contract/buyer/:id" element={<ContractDetailPageBuyer />} />
        <Route path="/contract/seller/:id" element={<ContractDetailPageSeller />} />
      </Routes>
    </Router>
  )
}

export default App
