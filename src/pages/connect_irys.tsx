import { useState } from "react";
import { ethers } from "ethers";
import { WebUploader } from "@irys/web-upload";
import { WebEthereum } from "@irys/web-upload-ethereum";
import { EthersV6Adapter } from "@irys/web-upload-ethereum-ethers-v6";

// global.d.ts или в самом файле
declare global {
  interface Window {
    ethereum?: any;
  }
}

type ConnectIrysPageProps = {
  setDevPageClicks: React.Dispatch<React.SetStateAction<number>>;
};

const ConnectIrysPage = ({ setDevPageClicks }: ConnectIrysPageProps) => {
  const [walletStatus, setWalletStatus] = useState("Not connected");
  const [irysStatus, setIrysStatus] = useState("Not connected");

  const connectWallet = async () => {
    console.log("connect wallet");

    if (typeof window.ethereum === "undefined") {
      console.error(
        "No Ethereum provider found. Please install MetaMask or another wallet."
      );
      setWalletStatus(
        "No Ethereum provider found. Please install MetaMask or another wallet."
      );
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setWalletStatus(`Connected: ${address}`);
    } catch (error) {
      console.error("Error connecting to wallet:", error);
      setWalletStatus("Error connecting to wallet");
    }
  };

  const connectIrys = async () => {
    if (typeof window.ethereum === "undefined") {
      console.error(
        "No Ethereum provider found. Please install MetaMask or another wallet."
      );
      setIrysStatus(
        "No Ethereum provider found. Please install MetaMask or another wallet."
      );
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const irysUploader = await WebUploader(WebEthereum).withAdapter(
        EthersV6Adapter(provider)
      );
      setIrysStatus(`Connected to Irys: ${irysUploader.address}`);
    } catch (error) {
      console.error("Error connecting to Irys:", error);
      setIrysStatus("Error connecting to Irys");
    }
  };

  return (
    <div>
      <div className="absolute top-0 bottom-0 left-0 right-0 h-full w-full bg-black" />
      <button
        className="absolute flex justify-center items-center top-5 left-5 w-20 h-10 rounded-xl bg-white/20 text-3xl"
        onClick={() => {
          setDevPageClicks(0);
        }}
      >
        {"←"}
      </button>
      <div className="absolute top-50 left-5 ">
        <button
          className="w-40 h-10 rounded-xl bg-white/20 text-white hover:bg-white/30"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
        <p className="mt-1 text-white">{walletStatus}</p>
      </div>
      <div className="absolute top-80 left-4">
        <button
          className="w-40 h-10 rounded-xl bg-white/20 text-white hover:bg-white/30"
          onClick={connectIrys}
        >
          Connect Irys
        </button>
        <p className="text-white mt-1">{irysStatus}</p>
      </div>
    </div>
  );
};

export default ConnectIrysPage;
