'use client'
import { useRouter } from 'next/navigation'
import { PageHeader } from '@/app/components/header'
import { TokenInfomationForm } from '@/app/components/token/TokenInfomationForm'
import { useToken } from '@/app/hooks/useToken'
import { sudtApi } from '@/app/components/apiClient'

export default function TokenInfomationModify({
  params,
}: {
  params: { typeId: string }
}) {
  const router = useRouter()
  const { token } = useToken()
  return (
    <>
      <PageHeader title="Modify Token Information" />
      <TokenInfomationForm
        token={token}
        onSubmit={(data) =>
          sudtApi.token
            .update(params.typeId, {
              name: data.name,
              decimal: data.decimal,
              description: data.description,
              website: data.website,
              icon: data.icon,
              amount: data.amount,
              email: data.email,
            })
            .then(() => {
              router.back()
            })
        }
      />
    </>
  )
}
