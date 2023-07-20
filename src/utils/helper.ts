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

// export const getBalance = async (addr: string) => {
//   const savedProvider = localStorage.getItem("provider");
//   const providerUrl =
//     savedProvider === "mainnet"
//       ? "https://rpcmain.arabianchain.org/"
//       : "https://rpctestnet.arabianchain.org";
//   const provider = new ethers.providers.JsonRpcProvider(
//     providerUrl,
//     savedProvider === "mainnet" ? 3269 : 3270
//   );
//   const balance: any = await provider.getBalance(addr);
//   return ethers.utils.formatEther(balance);
// };

export const getBalance = async (
  addr: string,
  network: "testnet" | "mainnet"
) => {
  const provider = createProvider(network);
  const balance: any = await provider.getBalance(addr);
  return ethers.utils.formatEther(balance);
};
