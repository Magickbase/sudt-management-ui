'use client'
import { PageHeader } from '@/app/components/header'
import { sudtApi } from '@/app/components/apiClient'
import { SendForm } from './SendForm'
import { transformTx } from '@/app/utils/tx'
import { useAccount } from '../hooks/useAccount'
import { useSearchParams } from 'next/navigation'
import { useRpc } from '@/app/hooks/useRPC'

export default function SendPage({}: {}) {
  const account = useAccount()
  const searchParams = useSearchParams()
  const { signAndSendTx } = useRpc()

  return (
    <>
      <PageHeader title="Send" />
      <SendForm
        defaultValues={{
          typeId: searchParams.get('typeId') || undefined,
        }}
        onSubmit={(data) =>
          sudtApi.token
            .transfer(data.typeId, {
              from: [account.addressHash],
              to: data.to,
              amount: data.amount,
            })
            .then((res) => {
              signAndSendTx(
                res,
                `Transfer ${data.amount} ${data.typeId} to ${data.to}`,
              )
            })
        }
      />
    </>
  )
}
