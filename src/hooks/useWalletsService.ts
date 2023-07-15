import { useState, useEffect } from "react";

interface Wallet {
  name: string;
  address: string;
  privateKey: string;
  password: string;
}

const useWalletsService = () => {
  const [wallets, setWallets] = useState<Wallet[]>(() => {
    const localData = JSON.parse(localStorage.getItem("wallets") || "[]");
    return localData;
  });

  useEffect(() => {
    localStorage.setItem("wallets", JSON.stringify(wallets));
  }, [wallets]);

  const getWallets = (): Wallet[] => wallets;

  const removeWallet = (wallet: Wallet): void => {
    setWallets(wallets.filter((w) => w !== wallet));
  };

  const getWallet = (address: string): Wallet | undefined =>
    wallets.find((w) => w.address === address);

  const addWallet = (wallet: Wallet): void => {
    if (!getWallet(wallet.address)) {
      setWallets([...wallets, wallet]);
    } else {
      alert("This wallet is already registered in the application.");
    }
  };

  const updateWallet = (wallet: Wallet): void => {
    setWallets(wallets.map((w) => (w.address === wallet.address ? wallet : w)));
  };

  return {
    getWallets,
    removeWallet,
    getWallet,
    addWallet,
    updateWallet,
  };
};

export default useWalletsService;
