'use client'
import useSWR from 'swr'
import React from 'react'
import { TokenContextProvider } from '@/app/hooks/useToken'
import { sudtApi } from '@/app/components/apiClient'
import { useAccount } from '@/app/hooks/useAccount'

// async function fetchToken(symbol: string) {
//   const tx = MOCK_TOKENS.find((token) => token.symbol === symbol)
//   return tx
// }

export default function TokenDetailLayout({
  params,
  children,
}: React.PropsWithChildren<{
  params: { symbol: string }
}>) {
  const { addressHash } = useAccount()
  const { data: tokens, isLoading } = useSWR(['token'], () =>
    sudtApi.token.list({ addressHash }),
  )
  const token = tokens?.find((token) => token.symbol === params.symbol)

  if (isLoading) {
    return <>loading...</>
  }

  if (!token) {
    return <>not found token</>
  }

  return <TokenContextProvider token={token}>{children}</TokenContextProvider>
}
