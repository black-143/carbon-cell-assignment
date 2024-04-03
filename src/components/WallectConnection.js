import React, { useState } from "react";
import { ethers } from "ethers";
import "./WallectConnection.css";
const ConnectWalletButton = () => {
  const [wallet, setWallet] = useState(null);
  const [connectedAddress, setConnectedAddress] = useState("");
  const [connected, setConnected] = useState(false);

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        // Requesting access to the user's MetaMask wallet
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = provider.getSigner();
        setWallet(signer);

        console.log(signer.address);
        // Getting the connected wallet address
        setConnectedAddress(signer.address);

        setConnected(true);
      } else {
        console.error("MetaMask not detected");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  return (
    <div className="trading-button">
      {connected ? (
        <div>
          <p>Connected to wallet!</p>
        </div>
      ) : (
        <button onClick={connectWallet}>Start Trading</button>
      )}
    </div>
  );
};

export default ConnectWalletButton;
