'use client'
import { PageHeader } from '@/app/components/header'
import { sudtApi } from '@/app/components/apiClient'
import { useAccount } from '@/app/hooks/useAccount'
import { TokenInfomationForm } from '@/app/components/token/TokenInfomationForm'
import { useRpc } from '@/app/hooks/useRPC'

export default function CreatePage({}: {}) {
  const account = useAccount()
  const { signAndSendTx } = useRpc()
  return (
    <>
      <PageHeader title="Create UDT" />
      <TokenInfomationForm
        onSubmit={(data) =>
          sudtApi.token
            .create({
              name: data.name,
              account: account.addressHash, // the address of owner
              decimal: data.decimal,
              description: data.description,
              website: data.website,
              icon: data.icon,
              amount: data.amount,
              email: data.email,
            })
            .then(async (res) => {
              signAndSendTx(res, 'Create Token')
            })
        }
      />
    </>
  )
}
