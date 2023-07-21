import { ethers } from "ethers";

// const savedProvider = localStorage.getItem("provider");
export const createProvider = (network: "testnet" | "mainnet") => {
  const providerUrl =
    network === "testnet"
      ? "https://rpctestnet.arabianchain.org"
      : "https://rpcmain.arabianchain.org/";
  const provider = new ethers.providers.JsonRpcProvider(
    providerUrl,
    network === "testnet" ? 3270 : 3269
  );
  return provider;
};

export const getTx = async (tx: string, network: "testnet" | "mainnet") => {
  const provider = createProvider(network);
  const txs: any = await provider.getTransaction(tx);
  return txs;
};

export const getBalance = async (
  addr: string,
  network: "testnet" | "mainnet"
) => {
  const provider = createProvider(network);
  const balance: any = await provider.getBalance(addr);
  return ethers.utils.formatEther(balance);
};
