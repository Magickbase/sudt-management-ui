'use client'

import { useState, useContext, createContext, useMemo, useEffect } from 'react'
import { Web3Modal } from '@web3modal/standalone'
import { WalletConnect } from '@/app/type'
import {
  type Address,
  type Transaction,
  type SignedTransaction,
  CkbWCSdk,
} from '@ckb-connect/walletconnect-dapp-sdk'
import { WC_ID, NETWORK, CODE_HASH_LIST } from '../utils'

const CHAIN_ID = 'ckb:testnet'
// TODO: use omnilock once neuron is ready
const LOCK_SCRIPT_CODE_HASH =
  '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8'

export const AccountContext = createContext<{
  id: string | null
  addressList: Array<Address>
  isConnected: boolean
  connect: (() => Promise<void>) | null
  disconnect: Function
  updateAddresses: () => Promise<Array<Address>>
  signTransaction: (
    transaction: Transaction,
    description?: string,
  ) => Promise<SignedTransaction | undefined>
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
  const [provider, setProvider] = useState<CkbWCSdk | null>(null)
  const [account, setAccount] = useState<WalletConnect.Account | null>(null)
  const [addressList, setAddressList] = useState<Array<Address>>([])

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
      const result = await provider.getAddresses({
        [LOCK_SCRIPT_CODE_HASH]: {
          page: {
            size: 10,
            before: '',
            after: addressList[0].address ?? '',
          },
          type: 'all',
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
    const { uri, approval } = await provider.createConnect({
      network: NETWORK,
      scriptBases: CODE_HASH_LIST,
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
        provider.disconnect()
      }
    }
  }

  const disconnect = () => {
    if (!account || !provider) return
    return provider.disconnect().then(resetAccount)
  }

  const signTransaction = async (
    transaction: Transaction,
    description: string = '',
  ) => {
    if (!account || !chainId || !provider) return
    try {
      const res = await provider.signTransaction({
        transaction,
        description,
        actionType: 'sign',
      })
      return res.transaction
    } catch (e) {
      console.error(`Failed to sign a transaction: ${e}`)
    }
  }

  useEffect(() => {
    CkbWCSdk.init({
      projectId: WC_ID,
      metadata: {
        name: 'SUDT Management',
        description: 'Mint/Manage you SUDT on CKB',
        url: globalThis.location.href,
        icons: [],
      },
    })
      .then(setProvider)
      .catch(console.error)
  }, [setProvider])

  useEffect(() => {
    updateAddresses()
  }, [account?.topic])

  useEffect(() => {
    if (!provider) return

    const handleAccountChanged = resetAccount
    const handleAddressesChanged = updateAddresses
    provider.emitter.on(
      WalletConnect.Events.AccountChanged,
      handleAccountChanged,
    )
    provider.emitter.on(
      WalletConnect.Events.AddressesChagned,
      handleAddressesChanged,
    )
    return () => {
      provider.emitter.removeListener(
        WalletConnect.Events.AccountChanged,
        handleAccountChanged,
      )
      provider.emitter.removeListener(
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
