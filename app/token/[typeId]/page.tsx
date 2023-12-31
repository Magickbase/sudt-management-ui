'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import { PageHeader } from '@/app/components/header'
import { useToken } from '@/app/hooks/useToken'
import { HistoryList } from '@/app/components/history/HistoryList'
import { NetworkSwitch } from '@/app/components/network/NetworkSwitch'
import { useAccount } from '@/app/hooks/useAccount'
import { formatAmount } from '@/app/utils'
import { sudtApi } from '@/app/components/apiClient'

export default function TokenDetail() {
  const { token } = useToken()
  const { addressHash } = useAccount()
  const { data: assets } = useSWR(
    addressHash ? ['assets', addressHash] : null,
    () => sudtApi.account.listAssets(addressHash),
  )

  const asset = assets?.find((a) => a.typeId === token.typeId)

  return (
    <>
      <PageHeader />
      <div className="flex flex-col gap-4">
        <div className="text-center text-highlight-color text-2xl font-medium">
          {formatAmount(asset?.amount || '0', token.decimal)} {token.name}
        </div>

        <NetworkSwitch />

        <div className="flex justify-between px-4">
          <Link
            className="flex flex-col items-center"
            href={`/send?typeId=${token.typeId}`}
          >
            <img src="/icons/send.svg" alt="send" />
            <div className="font-medium text-highlight-color">Send</div>
          </Link>
          <Link className="flex flex-col items-center" href="/receive">
            <img src="/icons/receive.svg" alt="receive" />
            <div className="font-medium text-highlight-color">Receive</div>
          </Link>
          {addressHash === token.owner && (
            <Link
              className="flex flex-col items-center"
              href={`/token/${token.typeId}/modify`}
            >
              <img src="/icons/create.svg" alt="create" />
              <div className="font-medium text-highlight-color">Manage</div>
            </Link>
          )}
        </div>
      </div>

      <div className="mt-12 bg-lighter-color rounded-lg">
        <HistoryList typeId={token.typeId} />
      </div>
    </>
  )
}
