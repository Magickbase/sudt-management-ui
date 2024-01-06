import type { FC, DetailedHTMLProps, HTMLAttributes } from 'react'
import classnames from 'classnames'
import { HistoryItem } from './HistoryItem'
import useSWR from 'swr'
import { sudtApi } from '../apiClient'
import { useAccount } from '@/app/hooks/useAccount'

interface HistoryListProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  typeId?: string
}

export const HistoryList: FC<HistoryListProps> = ({
  className,
  typeId,
  ...attrs
}) => {
  const { addressHash } = useAccount()
  const {
    data: histories,
    error,
    isLoading,
  } = useSWR(['transaction'], () =>
    sudtApi.account.transferHistory(addressHash),
  )
  if (!histories) {
    return null
  }

  return (
    <div {...attrs} className={classnames(className, 'gap-2 flex flex-col')}>
      {histories
        .filter((h) =>
          typeId
            ? h.from.find((c) => c.token?.typeId === typeId) ||
              h.to.find((c) => c.token?.typeId === typeId)
            : true,
        )
        .map((history) => (
          <HistoryItem key={history.txHash} history={history} typeId={typeId} />
        ))}
    </div>
  )
}
