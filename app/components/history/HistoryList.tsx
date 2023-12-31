import type { FC, DetailedHTMLProps, HTMLAttributes } from 'react'
import classnames from 'classnames'
import { HistoryItem } from './HistoryItem'
import useSWR from 'swr'
import { sudtApi } from '../apiClient'
import { useAccount } from '@/app/hooks/useAccount'

interface HistoryListProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const HistoryList: FC<HistoryListProps> = ({ className, ...attrs }) => {
  const { addressHash } = useAccount()
  const {
    data: transactions,
    error,
    isLoading,
  } = useSWR(['transaction'], () =>
    sudtApi.account.transferHistory(addressHash),
  )
  if (!transactions) {
    return null
  }

  return (
    <div {...attrs} className={classnames(className, 'gap-2 flex flex-col')}>
      {transactions.map((tx) => (
        <HistoryItem key={tx.txHash} transaction={tx} />
      ))}
    </div>
  )
}
