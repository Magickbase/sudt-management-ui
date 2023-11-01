'use client'
import { PageHeader } from '@/app/components/header'
import { TokenMintForm } from '@/app/components/token/TokenMintForm'

export default function TokenMint() {
  return (
    <>
      <PageHeader title="Modify Token Information" />
      <TokenMintForm onSubmit={(data) => console.log(data)} />
    </>
  )
}
