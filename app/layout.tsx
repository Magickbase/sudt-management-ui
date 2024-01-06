import './globals.css'
import type { Metadata } from 'next'
import { SWRProvider } from './swr-provider'
import { Body } from './components/body'
import { NetworkContextProvider } from './hooks/useNetwork'
import { AccountContextProvider } from './hooks/useAccount'

export const metadata: Metadata = {
  title: 'SUDT Management',
  description:
    'This is a demo built on Kuai Framework, do not use in production directly.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <SWRProvider>
        <NetworkContextProvider>
          <AccountContextProvider>
            <Body>{children}</Body>
          </AccountContextProvider>
        </NetworkContextProvider>
      </SWRProvider>
    </html>
  )
}
