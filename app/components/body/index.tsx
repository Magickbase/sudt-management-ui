'use client'
import { useAccount } from '@/app/hooks/useAccount'
import { Inter } from 'next/font/google'
import { TailwindToaster } from '@/app/components/toaster'
import { Account } from '../account'
import { MainSection } from '../section'
import { ConnectAccount } from '../connect-account'
const inter = Inter({ subsets: ['latin'] })

export function Body({ children }: { children: React.ReactNode }) {
  const account = useAccount()
  console.log(account.addressHash)

  return (
    <body className={inter.className}>
      <main className="flex min-h-screen flex-col items-center p-10">
        {account.isConnected ? (
          <>
            <Account />
            <MainSection>{children}</MainSection>
          </>
        ) : (
          <MainSection>
            <ConnectAccount />
          </MainSection>
        )}
        <TailwindToaster position="top-center" />
      </main>
    </body>
  )
}
