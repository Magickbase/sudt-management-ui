'use client'
import { PageHeader } from '@/app/components/header'
import { TokenInfomationForm } from '@/app/components/token/TokenInfomationForm'
import { useToken } from '@/app/hooks/useToken'

export default function TokenInfomation() {
  const { token } = useToken()
  return (
    <>
      <PageHeader title="Token Information" />
      <TokenInfomationForm token={token} readonly />
    </>
  )
}
