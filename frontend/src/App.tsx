import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/Auth/AuthContext.tsx";
import Home from "./pages/Home";
import NavBar from "./components/common/NavBar";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import PostPropertyPage from "./pages/PostProperty";
import DisplayPropertyPage from "./pages/DisplayProperty";
import { SolanaProvider } from "./components/common/SolanaProvider";

// import {
//   SmartContract,
//   BuyerSmartContractStage1,
//   BuyerSmartContractStage2,
//   SellerSmartContractStage1,
//   SellerSmartContractStage2
// } from "./pages/SmartContract";
// import { ContractDetailPageBuyer, ContractDetailPageSeller } from "./pages/ContractDetail";
// import { AuthProvider } from "./components/Auth/AuthContext";

function App() {
  return (
    <SolanaProvider>
      <Router>
        <AuthProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignupPage />} />
            <Route path="/post-property" element={<PostPropertyPage />} />
            <Route path="/property/:id" element={<DisplayPropertyPage />} />
            {/* <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/smart-contract" element={<SmartContract />} />
            <Route path="/smart-contract/buyer/stage-1" element={<BuyerSmartContractStage1 />} />
            <Route path="/smart-contract/buyer/stage-2" element={<BuyerSmartContractStage2 />} />
            <Route path="/smart-contract/seller/stage-1" element={<SellerSmartContractStage1 />} />
            <Route path="/smart-contract/seller/stage-2" element={<SellerSmartContractStage2 />} />
            <Route path="/contract/buyer/:id" element={<ContractDetailPageBuyer />} />
            <Route path="/contract/seller/:id" element={<ContractDetailPageSeller />} /> */}
          </Routes>
        </AuthProvider>
      </Router>
    </SolanaProvider>
  );
}

export default App;
