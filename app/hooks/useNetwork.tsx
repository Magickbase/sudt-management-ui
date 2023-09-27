"use client"
import { useState, useContext, createContext } from "react";

type Network = "testnet" | "mainnet";

export interface INetworkContext {
  network: Network;
  switchNetwork: (network: Network) => Promise<void>;
}

export const NetworkContext = createContext<INetworkContext | undefined>(
  undefined
);

export const useNetwork = () => {
  const context = useContext(NetworkContext);
  if (!context)
    throw new Error(
      "No NetworkContext.Provider found when calling useNetwork."
    );
  return context;
};

export const NetworkContextProvider = ({ children }: any) => {
  const [network, setNetwork] = useState<Network>("testnet");

  return (
    <NetworkContext.Provider
      value={{
        network,
        switchNetwork: async (network) => {
          setNetwork(network);
        },
      }}
    >
      {children}
    </NetworkContext.Provider>
  );
};
