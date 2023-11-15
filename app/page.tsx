'use client'
import { useState } from 'react'
import Link from 'next/link'
import { AssetList } from './components/asset/AssetList'
import { Tabs } from './components/tabs'
import { HistoryList } from './components/history/HistoryList'
import { TokenPanel } from './components/token/TokenPanel'
import { NetworkSwitch } from './components/network/NetworkSwitch'
import { ConnectAccount } from './components/connect-account'
import { useAccount } from './hooks/useAccount'
import { formatAmount } from './utils'
import useSWR from 'swr'
import { sudtApi } from './components/apiClient'

export default function Home() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const account = useAccount()
  const { data: assets } = useSWR(['assets'], () =>
    sudtApi.account.listAssets(account.addressHash),
  )

  if (!account.isConnected) {
    return <ConnectAccount />
  }

  const ckbBalance = assets?.find((asset) => asset.uan === 'CKB')?.amount || '0'

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="text-center text-highlight-color text-2xl font-medium">
          {formatAmount(ckbBalance, '8')} CKB
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
              label: 'Assets',
              children: <AssetList />,
            },
            {
              label: 'Tokens',
              children: <TokenPanel />,
            },
            {
              label: 'History',
              children: <HistoryList />,
            },
          ]}
          activeIndex={selectedIndex}
          onChange={setSelectedIndex}
        />
      </div>
    </>
  )
}
