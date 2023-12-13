'use client'
import useSWR from 'swr'
import React from 'react'
import { TokenContextProvider } from '@/app/hooks/useToken'
import { sudtApi } from '@/app/components/apiClient'
import { useAccount } from '@/app/hooks/useAccount'
import { PageHeader } from '@/app/components/header'

export default function TokenDetailLayout({
  params,
  children,
}: React.PropsWithChildren<{
  params: { typeId: string }
}>) {
  const { addressHash } = useAccount()
  const {
    data: tokens,
    error,
    isLoading,
  } = useSWR(['tokens', addressHash], () => sudtApi.token.list({ addressHash }))

  const token = tokens?.find((token) => token.typeId === params.typeId)

  if (isLoading) {
    return (
      <>
        <PageHeader title="loading..." />
        <div>loading...</div>
      </>
    )
  }

  if (!token) {
    return (
      <>
        <PageHeader title="error!" />
        <div>not found token/</div>
      </>
    )
  }

  return <TokenContextProvider token={token}>{children}</TokenContextProvider>
}
