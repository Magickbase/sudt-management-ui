"use client";
import { useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { Toggle } from "@/app/components/switch";
import classnames from "classnames";
import { MOCK_TRANSACTION } from "@/app/mock";
import { TransactionCellItem } from "@/app/components/transaction/TransactionCell";

async function fetchTx(txHash: string) {
  const tx = MOCK_TRANSACTION.find((tx) => tx.txHash === txHash);
  console.log(tx);
  return tx;
}

export default function TransactionDetail({
  params,
}: {
  params: { txHash: string };
}) {
  const router = useRouter();
  const {
    data: tx,
    error,
    isLoading,
  } = useSWR(["transaction", params.txHash], () => fetchTx(params.txHash));

  if (isLoading) {
    return <>loading...</>;
  }

  if (!tx) {
    return <>not found transaction</>;
  }

  return (
    <>
      <div
        className="flex items-center mb-4 cursor-pointer text-highlight-color text-lg"
        onClick={() => router.back()}
      >
        <img className="mr-2 h-3" src="/icons/back.svg" alt="back" />
        <span>Transaction Details</span>
      </div>

      <div className="bg-lighter-color flex flex-col gap-4 rounded-md p-4">
        <div>
          <div className="flex items-center text-highlight-color font-medium mb-3">
            <span className="mr-2">Input({tx.displayInputs.length})</span>
            <Toggle />
          </div>
          <div className="bg-lighter-color flex flex-col gap-4 rounded-md p-4">
            {tx.displayInputs.map((cell, index) => (
              <TransactionCellItem key={index} index={index} cell={cell} />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center text-highlight-color font-medium mb-3">
            <span className="mr-2">Output({tx.displayOutputs.length})</span>
            <Toggle />
          </div>
          <div className="bg-lighter-color flex flex-col rounded-md p-4">
            {tx.displayOutputs.map((cell, index) => (
              <TransactionCellItem
                className={classnames({
                  ["border-b-[1px] border-solid border-[#333333] pb-3 mb-3"]:
                    index < tx.displayOutputs.length - 1,
                })}
                key={index}
                index={index}
                cell={cell}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
