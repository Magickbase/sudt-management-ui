'use client'
import { PageHeader } from '@/app/components/header'
import { TokenMintForm } from '@/app/components/token/TokenMintForm'
import { sudtApi } from '@/app/components/apiClient'
import { useRpc } from '@/app/hooks/useRPC'

export default function TokenMint({ params }: { params: { typeId: string } }) {
  const { signAndSendTx } = useRpc()
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
            .then((res) => {
              signAndSendTx(res, `Mint Token to ${data.to}`)
            })
        }
      />
    </>
  )
}
