import { Dialog, Transition } from "@headlessui/react";
import {
  type FC,
  type ButtonHTMLAttributes,
  type PropsWithChildren,
  useState,
  Fragment,
} from "react";
import { Button } from "../button";
import { useNetwork } from "@/app/hooks/useNetwork";
import { DialogBox } from "../dialog/DialogBox";

export const NetworkSwitch: FC<
  PropsWithChildren<
    { isMainnet?: boolean } & ButtonHTMLAttributes<HTMLButtonElement>
  >
> = ({ children, className, isMainnet, ...attrs }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { network, switchNetwork } = useNetwork();

  function handleDismiss() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <Button
          className="flex items-center justify-center bg-lighter-color !p-2 text-xs"
          onClick={openModal}
        >
          <img className="mr-2" src="/icons/switch.svg" alt="switch" />
          <div className="bg-green-400 w-1 h-1 mr-2 rounded"/>
          {network === "mainnet" ? "Mirana Mainnet" : "Pudge Testnet"}
        </Button>
      </div>

      <DialogBox
        title="Switch CKB Network"
        isOpen={isOpen}
        handleDismiss={handleDismiss}
      >
        <Button
          primary
          ghost
          block
          className="mb-4"
          onClick={() => {
            switchNetwork("testnet");
            handleDismiss();
          }}
        >
          Pudge Testnet
        </Button>
        <Button
          disabled
          ghost
          block
          onClick={() => {
            switchNetwork("mainnet");
            handleDismiss();
          }}
        >
          Mirana Mainnet
        </Button>
      </DialogBox>
    </>
  );
};
