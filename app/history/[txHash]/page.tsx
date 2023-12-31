'use client'
import useSWR from 'swr'
import { useRouter } from 'next/navigation'
import { Toggle } from '@/app/components/switch'
import { PageHeader } from '@/app/components/header'
import classnames from 'classnames'
import { TransactionCellItem } from '@/app/components/transaction/TransactionCell'
import { sudtApi } from '@/app/components/apiClient'
import { useAccount } from '@/app/hooks/useAccount'

export default function TransactionDetail({
  params,
}: {
  params: { txHash: string }
}) {
  const router = useRouter()
  const { addressHash } = useAccount()
  const {
    data: txs,
    error,
    isLoading,
  } = useSWR(['transaction'], () =>
    sudtApi.account.transferHistory(addressHash),
  )

  if (isLoading) {
    return <>loading...</>
  }

  if (!txs) {
    return <>not found transaction</>
  }

  const tx = txs.find((tx) => tx.txHash === params.txHash)

  if (!tx) {
    return <>not found transaction</>
  }

  return (
    <>
      <PageHeader title="Transaction Details" />
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
                  ['border-b-[1px] border-solid border-[#333333] pb-3 mb-3']:
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
  )
}
