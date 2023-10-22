'use client'
import { useAccount } from '@/app/hooks/useAccount'
import { Button } from '@/app/components/button'
import { SubSection } from '../section'

export const Account = () => {
  const account = useAccount()

  if (!account.isConnected) {
    return null
  }

  if (!account.addressList[0]) {
    return <SubSection>Loading...</SubSection>
  }

  return (
    <SubSection>
      <div className="flex">
        <div className="flex-1 overflow-hidden text-sm">
          <div className="overflow-hidden text-ellipsis ">{account?.id}</div>
          <div className="text-dimmed-color">Account</div>
        </div>
        <div>
          <Button
            className="flex items-center justify-center ml-2 border border-solid border-alert text-alert text-sm h-4 cursor-pointer"
            onClick={() => account?.disconnect()}
          >
            Disconnect
          </Button>
        </div>
      </div>
    </SubSection>
  )
}
