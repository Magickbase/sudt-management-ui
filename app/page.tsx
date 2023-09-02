'use client'
import { MainSection, SubSection } from './components/section'
import { PrimaryButton } from './components/button'
import { NetworkItem } from './components/network'
import { MyDialog } from './components/dialog'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <SubSection>
        <div>SubSection</div>
      </SubSection>
      <MainSection>
        <div className="flex flex-col gap-4">
          <PrimaryButton>Primary Button</PrimaryButton>
          <NetworkItem isMainnet disabled>
            Mainnet
          </NetworkItem>
          <NetworkItem>Testnet</NetworkItem>
          <MyDialog
            title="Title"
            description="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          />
        </div>
      </MainSection>
    </main>
  )
}
