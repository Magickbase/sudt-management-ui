'use client'
import { PageHeader } from '@/app/components/header'
import { sudtApi } from '@/app/components/apiClient'
import { useAccount } from '@/app/hooks/useAccount'
import { transformTx } from '@/app/utils/tx'
import { TokenInfomationForm } from '@/app/components/token/TokenInfomationForm'

export default function CreatePage({}: {}) {
  const account = useAccount()
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
            .then((res) => {
              account
                .signTransaction(
                  {
                    ...transformTx(res),
                    fee: '1000',
                    description: 'Create Token',
                  },
                  'Create Token',
                  'signAndSend',
                )
                .then((res) => {
                  console.log(res)
                })
            })
        }
      />
    </>
  )
}
