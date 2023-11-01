'use client'
import { PageHeader } from '@/app/components/header'
import { TokenInfomationForm } from '@/app/components/token/TokenInfomationForm'
import { useToken } from '@/app/hooks/useToken'

export default function TokenInfomationModify() {
  const { token } = useToken()
  return (
    <>
      <PageHeader title="Modify Token Information" />
      <TokenInfomationForm
        token={token}
        onSubmit={(data) => console.log(data)}
      />
    </>
  )
}
