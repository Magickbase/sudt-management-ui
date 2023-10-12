"use client";
import { useState, useContext, createContext } from "react";
import type { Account } from "@/app/type";
import { MOCK_ACCOUNTS } from "@/app/mock";

export interface IAccountContext {
  account: Account;
}

export const AccountContext = createContext<IAccountContext | undefined>(
  undefined
);

export const useAccount = () => {
  const context = useContext(AccountContext);
  if (!context)
    throw new Error(
      "No AccountContext.Provider found when calling useAccount."
    );
  return context;
};

export const AccountContextProvider = ({ children }: any) => {
  const [account, setAccount] = useState<Account>(MOCK_ACCOUNTS["self"]);

  return (
    <AccountContext.Provider
      value={{
        account,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
