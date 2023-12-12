'use client'
import { PageHeader } from '@/app/components/header'
import { sudtApi } from '@/app/components/apiClient'
import { SendForm } from './SendForm'
import { transformTx } from '@/app/utils/tx'
import { useAccount } from '../hooks/useAccount'

export default function SendPage({}: {}) {
  const account = useAccount()
  return (
    <>
      <PageHeader title="Send" />
      <SendForm
        onSubmit={(data) =>
          sudtApi.token
            .transfer(data.typeId, {
              from: [account.addressHash],
              to: data.to,
              amount: data.amount,
            })
            .then((res) =>
              account
                .signTransaction(
                  {
                    ...transformTx(res),
                    fee: '1000',
                    description: `Transfer ${data.amount} ${data.typeId} to ${data.to}`,
                  },
                  `Transfer ${data.amount} ${data.typeId} to ${data.to}`,
                  'signAndSend',
                )
                .then((res) => {
                  console.log(res)
                }),
            )
        }
      />
    </>
  )
}
