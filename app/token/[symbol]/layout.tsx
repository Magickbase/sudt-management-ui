'use client'
import useSWR from 'swr'
import React, { cloneElement } from 'react'
import { MOCK_TOKENS } from '@/app/mock'
import { TokenContextProvider } from '@/app/hooks/useToken'

async function fetchToken(symbol: string) {
  const tx = MOCK_TOKENS.find((token) => token.symbol === symbol)
  return tx
}

export default function TokenDetailLayout({
  params,
  children,
}: React.PropsWithChildren<{
  params: { symbol: string }
}>) {
  const { data: token, isLoading } = useSWR(['token', params.symbol], () =>
    fetchToken(params.symbol),
  )

  if (isLoading) {
    return <>loading...</>
  }

  if (!token) {
    return <>not found token</>
  }

  return <TokenContextProvider token={token}>{children}</TokenContextProvider>
}
