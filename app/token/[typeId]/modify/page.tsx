'use client'
import { useRouter } from 'next/navigation'
import { PageHeader } from '@/app/components/header'
import { TokenInfomationForm } from '@/app/components/token/TokenInfomationForm'
import { useToken } from '@/app/hooks/useToken'
import { sudtApi } from '@/app/components/apiClient'
import { toast } from 'react-hot-toast'
import { useSWRConfig } from 'swr'
import { useAccount } from '@/app/hooks/useAccount'

export default function TokenInfomationModify({
  params,
}: {
  params: { typeId: string }
}) {
  const router = useRouter()
  const { addressHash } = useAccount()
  const { mutate } = useSWRConfig()
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
              toast.success('Modify Token Information Success!')
              mutate(['tokens', addressHash])
              router.back()
            })
        }
      />
    </>
  )
}
