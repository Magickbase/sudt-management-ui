'use client'
import { PageHeader } from '@/app/components/header'
import { useRouter } from 'next/navigation'
import QRCode from 'react-qr-code'
import { useAccount } from '../hooks/useAccount'
import { useCopyToClipboard } from '@uidotdev/usehooks'
import { Button } from '@/app/components/button'
import { toast } from 'react-hot-toast'

export default function ReceivePage({}: {}) {
  const router = useRouter()
  const account = useAccount()
  const [copiedText, copyToClipboard] = useCopyToClipboard()

  return (
    <>
      <PageHeader title="Receive" />
      <div className="flex flex-col items-center justify-center">
        <div className="bg-white p-3 rounded-lg mb-4">
          <QRCode size={184} value={account.addressHash} />
        </div>
        <p className="break-all text-center mb-4">{account.addressHash}</p>
        <div className="flex items-center mb-4 text-primary-color cursor-pointer">
          <img className="mr-2" src="/icons/copy.svg" alt="copy" />
          <a
            onClick={() => {
              copyToClipboard(account.addressHash)
              toast.success('Copied!')
            }}
          >
            Copy
          </a>
        </div>

        <Button primary block onClick={() => router.back()}>
          Confirm
        </Button>
      </div>
    </>
  )
}
