'use client'

import { useState, useContext, createContext, useMemo, useEffect } from 'react'
import UniversalProvider from '@walletconnect/universal-provider'
import { Web3Modal } from '@web3modal/standalone'
import { WalletConnect } from '@/app/type'
import { WC_ID, CODE_HASH_LIST } from '../utils'

const CHAIN_ID = 'ckb:testnet'
// TODO: use omnilock once neuron is ready
const LOCK_SCRIPT_CODE_HASH =
  '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8'

export const AccountContext = createContext<{
  id: string | null
  addressList: Array<WalletConnect.AddressItem>
  isConnected: boolean
  connect: (() => Promise<void>) | null
  disconnect: Function
  updateAddresses: () => Promise<Array<WalletConnect.AddressItem>>
  signTransaction: (
    transaction: WalletConnect.Transaction,
    description?: string,
  ) => Promise<WalletConnect.SignedTransaction | undefined>
}>({
  id: null,
  addressList: [],
  isConnected: false,
  connect: null,
  disconnect: () => {},
  updateAddresses: () => Promise.resolve([]),
  signTransaction: () => Promise.resolve(undefined),
})

export const useAccount = () => {
  const ctx = useContext(AccountContext)
  if (!ctx) throw new Error('Failed to fetch wallet')
  return ctx
}

export const AccountContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [provider, setProvider] = useState<UniversalProvider | null>(null)
  const [account, setAccount] = useState<WalletConnect.Account | null>(null)
  const [addressList, setAddressList] = useState<
    Array<WalletConnect.AddressItem>
  >([])

  const primaryAccount = account?.accounts[0]

  const { chainId, accountId } = useMemo(() => {
    if (!primaryAccount) return { chainId: null, accountId: null }
    const [chain, network, accountId] = primaryAccount.split(':')
    return { chainId: `${chain}:${network}`, accountId }
  }, [primaryAccount])

  const isConnected = !!chainId

  const web3Modal = new Web3Modal({
    projectId: WC_ID!,
    standaloneChains: [CHAIN_ID],
    walletConnectVersion: 2,
  })

  const resetAccount = () => {
    setAccount(null)
    setAddressList([])
    window.onbeforeunload = null
  }

  const updateAddresses = async () => {
    if (!account || !chainId || !provider) {
      setAddressList([])
      return addressList
    }
    try {
      const result = await provider.client.request<
        Record<string, Array<WalletConnect.AddressItem>>
      >({
        topic: account.topic,
        chainId,
        request: {
          method: 'ckb_getAddresses',
          params: {
            [LOCK_SCRIPT_CODE_HASH]: {
              page: {
                size: 10,
                after: addressList[0] ?? '',
              },
              type: 'all',
            },
          },
        },
      })
      const list = result[LOCK_SCRIPT_CODE_HASH] ?? []

      setAddressList(list)

      return list
    } catch (e) {
      console.error(`Failed to fetch address: ${e}`)
      return []
    }
  }

  const connect = async () => {
    if (!provider) {
      throw new Error('Provider is not found')
    }
    const { uri, approval } = await provider.client.connect({
      sessionProperties: {
        scriptBases: CODE_HASH_LIST.toString(),
      },
    })
    await web3Modal.openModal({ uri })
    const session = await approval()

    if (session) {
      web3Modal.closeModal()
      setAccount({
        ...(session.namespaces.ckb as WalletConnect.Account),
        topic: session.topic,
      })
      window.onbeforeunload = () => {
        window.alert('hwl')
        provider.client.disconnect({
          topic: session.topic,
          reason: {
            code: 0,
            message: 'Disconnected by page',
          },
        })
      }
    }
  }

  const disconnect = () => {
    if (!account || !provider) return
    return provider.client
      .disconnect({
        topic: account.topic,
        reason: {
          code: 0,
          message: 'Disconnected by user',
        },
      })
      .then(resetAccount)
  }

  const signTransaction = async (
    transaction: WalletConnect.Transaction,
    description?: string,
  ) => {
    if (!account || !chainId || !provider) return
    try {
      const res =
        await provider.client.request<WalletConnect.SignedTransaction>({
          topic: account.topic,
          chainId,
          request: {
            method: 'ckb_signTransaction',
            params: {
              transaction,
              actionType: 'sign',
              description,
            },
          },
        })
      return res
    } catch (e) {
      console.error(`Failed to sign a transaction: ${e}`)
    }
  }

  useEffect(() => {
    UniversalProvider.init({
      projectId: WC_ID,
      metadata: {
        name: 'SUDT Management',
        description: 'Mint/Manage you SUDT on CKB',
        url: globalThis.location.href,
        icons: [],
      },
    }).then((p) => {
      setProvider(p)
    })
  }, [setProvider])

  useEffect(() => {
    updateAddresses()
  }, [account?.topic])

  useEffect(() => {
    if (!provider) return

    const handleAccountChanged = resetAccount
    const handleAddressesChanged = updateAddresses
    provider.on(WalletConnect.Events.AccountChanged, handleAccountChanged)
    provider.on(WalletConnect.Events.AddressesChagned, handleAddressesChanged)
    return () => {
      provider.removeListener(
        WalletConnect.Events.AccountChanged,
        handleAccountChanged,
      )
      provider.removeListener(
        WalletConnect.Events.AddressesChagned,
        handleAddressesChanged,
      )
    }
  }, [provider])

  return (
    <AccountContext.Provider
      value={{
        id: accountId,
        addressList,
        isConnected,
        connect,
        disconnect,
        updateAddresses,
        signTransaction,
      }}
    >
      {children}
    </AccountContext.Provider>
  )
}
