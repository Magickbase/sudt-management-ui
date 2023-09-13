"use client";
import { Tab } from "@headlessui/react";
import { AssetItem } from "./components/asset/AssetItem";
import { MainSection, SubSection } from "./components/section";
import { Button } from "./components/button";
import { NetworkSwitch } from "./components/network/NetworkSwitch";
import { shannonToCkbDecimal } from "./utils";
import { useState } from "react";

const MOCK_ACCOUNT = {
  address:
    "ckt1qzda0cr08m85hc8jlnfp3zer7xulejywt49kt2rr0vthywaa50xwsq0dnd72kh63g08574r38qkyph2ewl9ummcfp6znk",
  balance: "48642877372524671",
};

export default function Home() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  // todo: change to real account
  const account = MOCK_ACCOUNT;

  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <SubSection>
        <div>SubSection</div>
      </SubSection>
      <MainSection>
        <div className="flex flex-col gap-4">

          <div className="text-center text-highlight-color text-2xl font-medium">
            {shannonToCkbDecimal(
              account.balance,
              account.balance.length > 16 ? 2 : account.balance.length > 14 ? 4 : 8
            )}{" "}
            CKB
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
          <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
            <Tab.List className="p-4 border-b border-solid border-[#333333] flex justify-between">
              <Tab>Assets</Tab>
              <Tab>Tokens</Tab>
              <Tab>History</Tab>
            </Tab.List>

            <Tab.Panels className="p-4">
              <Tab.Panel>
                <AssetItem
                  asset={{ symbol: "CKB", amount: 1000, decimal: 0 }}
                />
              </Tab.Panel>
              <Tab.Panel>
                <h3 className="font-sm text-highlight-color mb-4">Autodetect Tokens</h3>
                <p className="font-xs mb-4">
                  We use third-party APIs to detect Tokens on CKB network, which
                  means your IP address may be exposed to centralized servers.
                </p>
                <Button primary block>Turn On</Button>
              </Tab.Panel>
              <Tab.Panel>Todo</Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </MainSection>
    </main>
  );
}
