'use client'
import { transformTx, transformSignedTx } from '@/app/utils/tx'
import { ckbRpc } from '@/app/components/rpc'
import { ServerTransaction } from '@/app/type'

import { toast } from 'react-hot-toast'
import { Button } from '@/app/components/button'
import { useAccount } from './useAccount'

export const useRpc = () => {
  const account = useAccount()

  const signAndSendTx = async (
    transaction: ServerTransaction,
    description: string,
  ) => {
    const toastId = toast.loading('Please open neuron for signature')
    const signedTx = await account
      .signTransaction(
        {
          ...transformTx(transaction),
          fee: '1000',
          description,
        },
        description,
      )
      .then((res) => {
        if (!res) {
          throw new Error('Signature Failure')
        }

        return transformSignedTx(res)
      })
      .catch((error: Error) => {
        toast.error(error.message, { id: toastId })
        throw error
      })
    toast.loading('Signature Success, transaction committing...', {
      id: toastId,
    })

    ckbRpc
      .sendTransaction(signedTx, 'passthrough')
      .then((txHash) => {
        toast(
          (t) => (
            <span>
              Committed success!
              <Button
                className="py-2 ml-2"
                primary
                onClick={() => {
                  toast.dismiss(t.id)
                  window.open(
                    `https://explorer.nervos.org/aggron/transaction/${txHash}`,
                    '_blank',
                  )
                }}
              >
                detail
              </Button>
            </span>
          ),
          { duration: 10000, id: toastId },
        )
      })
      .catch((err: Error) => {
        console.error(err)
        toast.error(`Send transaction failure: ${err.message}`, {
          id: toastId,
        })
      })
  }

  return { signAndSendTx }
}
