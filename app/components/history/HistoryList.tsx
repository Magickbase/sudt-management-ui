import type { FC, DetailedHTMLProps, HTMLAttributes } from "react";
import classnames from 'classnames';
import { HistoryItem } from './HistoryItem';
import { type Transaction } from '@/app/type';
import { MOCK_TRANSACTION } from '@/app/mock';


interface HistoryListProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
}


export const HistoryList: FC<HistoryListProps> = ({
  className,
  ...attrs
}) => {
  const transactions: Transaction[] = MOCK_TRANSACTION
  return (
    <div
      {...attrs}
      className={classnames(className, "gap-2 flex flex-col")}
    >
      {transactions.map((tx) => (
        <HistoryItem key={tx.txHash} transaction={tx}  />
      ))}      
    </div>
  );
};
