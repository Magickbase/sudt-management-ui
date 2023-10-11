"use client";
import { useState } from "react";
import Link from "next/link";
import { AssetItem } from "./components/asset/AssetItem";
import { Button } from "./components/button";
import { Tabs } from "./components/tabs";
import { HistoryList } from "./components/history/HistoryList";
import { TokenPanel } from "./components/token/TokenPanel";
import { NetworkSwitch } from "./components/network/NetworkSwitch";
import { formatAmount } from "./utils";
import { useAccount } from "./hooks/useAccount";

export default function Home() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { account } = useAccount();

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="text-center text-highlight-color text-2xl font-medium">
          {formatAmount(account.balance, "8")} CKB
        </div>

        <NetworkSwitch />

        <div className="flex justify-between px-4">
          <Link className="flex flex-col items-center" href="/send">
            <img src="/icons/send.svg" alt="send" />
            <div className="font-medium text-highlight-color">Send</div>
          </Link>
          <button>
            <img src="/icons/receive.svg" alt="receive" />
            <div className="font-medium text-highlight-color">Receive</div>
          </button>
          <Link className="flex flex-col items-center" href="/create">
            <img src="/icons/create.svg" alt="create" />
            <div className="font-medium text-highlight-color">Create</div>
          </Link>
        </div>
      </div>

      <div className="mt-12 bg-lighter-color rounded-lg">
        <Tabs
          items={[
            {
              label: "Assets",
              children: (
                <AssetItem
                  asset={{ symbol: "CKB", amount: "1000", decimal: "0" }}
                />
              ),
            },
            {
              label: "Tokens",
              children: <TokenPanel />,
            },
            {
              label: "History",
              children: <HistoryList />,
            },
          ]}
          activeIndex={selectedIndex}
          onChange={setSelectedIndex}
        />
      </div>
    </>
  );
}
