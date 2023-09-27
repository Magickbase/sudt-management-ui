import type { FC, DetailedHTMLProps, HTMLAttributes } from "react";
import BigNumber from "bignumber.js";
import dayjs from 'dayjs';
import classnames from 'classnames';
import Link from "next/link";
import {
  type Transaction,
  type TransactionUdtCell,
  TYPE_LABEL_MAP,
} from "@/app/type";
import { parseAmount, formatAmount, ellipsisTextMiddle } from "@/app/utils";
import { useAccount } from "@/app/hooks/useAccount";

interface HistoryItemProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  transaction: Transaction;
}

export const HistoryItem: FC<HistoryItemProps> = ({
  transaction,
  className,
  ...attrs
}) => {
  const { account } = useAccount();

  const displayCells =
    transaction.type === "from"
      ? transaction.displayInputs
      : transaction.displayOutputs;

  const bills: {
    ckb: string;
    udts: { symbol: string; amount: string }[];
  } = (() => {
    const selfInputs = transaction.displayInputs.filter(
      (cell) => cell.addressHash === account.address
    );
    const selfOutputs = transaction.displayOutputs.filter(
      (cell) => cell.addressHash === account.address
    );

    const ckbInputAmount = selfInputs.reduce((a, b) => {
      return a.plus(parseAmount(b.capacity, "8"));
    }, new BigNumber(0));
    const ckbOutputAmount = selfOutputs.reduce((a, b) => {
      return a.plus(parseAmount(b.capacity, "8"));
    }, new BigNumber(0));

    const udtsInputAmount = (
      selfInputs.filter(
        (cell) => cell.cellType === "udt"
      ) as TransactionUdtCell[]
    ).reduce(
      (a, b) => ({
        ...a,
        [b.extraInfo.symbol]: (a[b.extraInfo.symbol] ?? new BigNumber(0)).plus(
          parseAmount(b.extraInfo.amount, b.extraInfo.decimal)
        ),
      }),
      {} as { [symbol: string]: BigNumber }
    );

    const udtsOutputAmount = (
      selfOutputs.filter(
        (cell) => cell.cellType === "udt"
      ) as TransactionUdtCell[]
    ).reduce(
      (a, b) => ({
        ...a,
        [b.extraInfo.symbol]: (a[b.extraInfo.symbol] ?? new BigNumber(0)).plus(
          parseAmount(b.extraInfo.amount, b.extraInfo.decimal)
        ),
      }),
      {} as { [symbol: string]: BigNumber }
    );

    const allUdtSymbols = Array.from(
      new Set([
        ...Object.keys(udtsInputAmount),
        ...Object.keys(udtsOutputAmount),
      ])
    );

    return {
      ckb: ckbOutputAmount.minus(ckbInputAmount).toString(),
      udts: allUdtSymbols.map((symbol) => ({
        symbol,
        amount: (udtsOutputAmount[symbol] ?? new BigNumber(0))
          .minus(udtsInputAmount[symbol] ?? new BigNumber(0))
          .toString(),
      })),
    };
  })();

  return (
    <div
      {...attrs}
      className={`${
        className ?? ""
      } w-full flex flex-col bg-lighter-color p-3 rounded-lg text-sm`}
    >
      <div className="flex mb-2">
        <Link
          className="text-primary-color font-medium"
          href={`/history/${transaction.txHash}`}
        >
          {ellipsisTextMiddle(transaction.txHash)}
        </Link>
        <span className={classnames("ml-auto text-xs", { "text-orange-400": transaction.txStatus !== "committed" })}>
          {transaction.txStatus === "committed"
            ? dayjs(parseInt(transaction.blockTimestamp || "0")).format('YYYY.MM.DD HH:MM:SS')
            : transaction.txStatus}
        </span>
      </div>
      <div className="text-secondary-color">
        {TYPE_LABEL_MAP[transaction.type]}:{" "}
        {ellipsisTextMiddle(displayCells[0].addressHash)}{" "}
        {displayCells.length > 1 && `(+${displayCells.length - 1} Addresses)`}
      </div>
      <div className="flex flex-col gap-1 border-t-[1px] border-solid border-secondary-color pt-2 mt-2">
        {bills.udts.map((udt) => (
          <div className="ml-auto text-highlight-color" key={udt.symbol}>
            {udt.amount[0] === "-" ? "" : "+"}
            {formatAmount(udt.amount, "0")} {udt.symbol}
          </div>
        ))}
        <div className="ml-auto text-secondary-color text-xs">
          {bills.ckb[0] === "-" ? "" : "+"}
          {formatAmount(bills.ckb, "0")} CKB
        </div>
      </div>
    </div>
  );
};
