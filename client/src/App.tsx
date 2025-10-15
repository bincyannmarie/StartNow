import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import IdeaInputMultiStep from "./pages/IdeaInputMultiStep";
import GenerateProposal from "./pages/GenerateProposal";
import Explore from "./pages/Explore";
import StartupDetail from "./pages/StartupDetail";
import AuthCallback from "./pages/AuthCallback";
import { AuthProvider } from "./contexts/AuthContext";
import { StartupProvider } from "./contexts/StartupContext";
import { WalletProvider } from "./contexts/WalletContext";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { Network } from "@aptos-labs/ts-sdk";
import InvestorLogin from "./pages/InvestorLogin";
import InvestorDashboard from "./pages/InvestorDashboard";

function App() {
  return (
    <AptosWalletAdapterProvider
      autoConnect={true}
      dappConfig={{ network: Network.TESTNET }}
      onError={(error) => {
        console.log("Wallet adapter error:", error);
      }}
    >
      <WalletProvider>
        <AuthProvider>
          <StartupProvider>
            <Router>
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/explore" element={<Explore />} />
                  <Route path="/startup/:id" element={<StartupDetail />} />
                  <Route path="/idea-input" element={<IdeaInputMultiStep />} />
                  <Route
                    path="/generate-proposal"
                    element={<GenerateProposal />}
                  />
                  <Route path="/auth/callback" element={<AuthCallback />} />
                  <Route path="/investor-login" element={<InvestorLogin />} />
                  <Route path="/investor-dashboard" element={<InvestorDashboard />} />
                </Routes>
              </Layout>
            </Router>
          </StartupProvider>
        </AuthProvider>
      </WalletProvider>
    </AptosWalletAdapterProvider>
  );
}

export default App;


