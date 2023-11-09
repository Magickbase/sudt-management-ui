import type { Network } from '@ckb-connect/walletconnect-dapp-sdk'
export const WC_ID = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID
export const CODE_HASH_LIST =
  process.env.NEXT_PUBLIC_CODE_HASH_LIST?.split(',') ?? []
export const NETWORK: Network =
  (process.env.NEXT_PUBLIC_NETWORK as Network) ?? 'testnet'
