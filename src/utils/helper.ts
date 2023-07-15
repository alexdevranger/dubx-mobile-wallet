import { ethers } from "ethers";

// export const formatBalance = (rawBalance) => {
//   const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2);
//   return balance;
// };

// export const formatChainAsNum = (chainIdHex) => {
//   const chainIdNum = parseInt(chainIdHex);
//   return chainIdNum;
// };

export const createProvider = () => {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://rpctestnet.arabianchain.org",
    3270
  );
  return provider;
};

export const getBalance = async (addr: string) => {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://rpctestnet.arabianchain.org",
    3270
  );
  const balance: any = await provider.getBalance(addr);
  // return ethers.utils.parseEther(balance);
  return ethers.utils.formatEther(balance);
  // return balance;
};
