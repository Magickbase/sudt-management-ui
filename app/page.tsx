"use client";
import { AssetItem } from "./components/asset/AssetItem";
import { Button } from "./components/button";
import { Tabs } from "./components/tabs";
import { HistoryList } from "./components/history/HistoryList";
import { NetworkSwitch } from "./components/network/NetworkSwitch";
import { formatAmount } from "./utils";
import { useState } from "react";
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
          <button>
            <img src="/icons/send.svg" alt="send" />
            <div className="font-medium text-highlight-color">Send</div>
          </button>
          <button>
            <img src="/icons/receive.svg" alt="receive" />
            <div className="font-medium text-highlight-color">Receive</div>
          </button>
          <button>
            <img src="/icons/manage.svg" alt="manage" />
            <div className="font-medium text-highlight-color">Manage</div>
          </button>
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
              children: (
                <>
                  <h3 className="font-sm text-highlight-color mb-4">
                    Autodetect Tokens
                  </h3>
                  <p className="font-xs mb-4">
                    We use third-party APIs to detect Tokens on CKB network,
                    which means your IP address may be exposed to centralized
                    servers.
                  </p>
                  <Button primary block>
                    Turn On
                  </Button>
                </>
              ),
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
