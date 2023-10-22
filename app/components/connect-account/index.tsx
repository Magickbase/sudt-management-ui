import Image from 'next/image'
import { Button } from '@/app/components/button'
import { useAccount } from '@/app/hooks/useAccount'

export const ConnectAccount = () => {
  const { connect: onConnect } = useAccount()
  return (
    <div className="flex flex-col items-center">
      <Image src="/logo.png" alt="logo" width="80" height="122" />
      <h1 className="my-6 font-medium">CKB SUDT Management</h1>
      <p className="leading-8 font-normal text-lg text-center mb-[64px]">
        Create / Transfer / Manage SUDT easily on CKB network
      </p>
      <Button primary block onClick={() => onConnect?.()}>
        Connect by WalletConnect
      </Button>
    </div>
  )
}
