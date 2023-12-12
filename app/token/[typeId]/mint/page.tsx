'use client'
import { PageHeader } from '@/app/components/header'
import { TokenMintForm } from '@/app/components/token/TokenMintForm'
import { useAccount } from '@/app/hooks/useAccount'
import { sudtApi } from '@/app/components/apiClient'
import { transformTx } from '@/app/utils/tx'

export default function TokenMint({ params }: { params: { typeId: string } }) {
  const account = useAccount()
  return (
    <>
      <PageHeader title="Modify Token Information" />
      <TokenMintForm
        onSubmit={(data) =>
          sudtApi.token
            .mint(params.typeId, {
              to: data.to,
              amount: data.amount,
            })
            .then((res) =>
              account
                .signTransaction(
                  {
                    ...transformTx(res),
                    fee: '1000',
                    description: `Mint Token to ${data.to}`,
                  },
                  `Mint Token to ${data.to}`,
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
