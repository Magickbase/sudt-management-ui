import type { TransactionSkeletonObject } from '@ckb-lumos/helpers'

export type TransactionNormalCell = {
  cellType: 'normal'
  address: string
  capacity: string
}

export type UdtInfo = {
  amount: string
  decimal: string
  symbol: string
}

export type TransactionUdtCell = {
  cellType: 'udt'
  address: string
  capacity: string
  extraInfo: UdtInfo
}

export type TransactionCell = TransactionNormalCell | TransactionUdtCell

export interface Transaction {
  type: 'from' | 'to' | 'mint' // for mock, todo: after migrate to api, the type is calculated based on the inputs and outputs
  txHash: string
  blockTimestamp?: string
  txStatus: 'committed' | 'pending' | 'proposed'
  displayInputs: TransactionCell[]
  displayOutputs: TransactionCell[]
}

export interface TransactionHistoryCell {
  typeId: string
  amount: string
  address: string
  token: {
    name: string
    decimal: string
  }
}

export interface TransactionHistoryWrapper {
  lastCursor: string
  history: TransactionHistory[]
}

export interface TransactionHistory {
  txHash: string
  list: {
    from: TransactionHistoryCell[]
    to: TransactionHistoryCell[]
  }[]
}

export interface ServerTransaction
  extends Omit<TransactionSkeletonObject, 'inputSinces' | 'cellProvider'> {
  inputSinces: Record<string, string>
}

export type UdtCell = {
  address: string
  amount: string
  typeId: string
  ckb: string
  token: Token
}

export type NormalCell = {
  address: string
  ckb: string
  amount: undefined
  typeId: undefined
  token: undefined
}

export type HistoryCell = UdtCell | NormalCell
export interface ServerHistory {
  txHash: string
  from: HistoryCell[]
  to: HistoryCell[]
}

export const TYPE_LABEL_MAP = {
  from: 'From',
  to: 'To',
  mint: 'Mint to',
}

export type Assets = {
  amount: string
  decimal: string
  displayName: string
  uan: string
  typeId: string
}

export type Token = {
  symbol: string
  decimal: string
  typeId: string
  name: string
  email: string
  description: string
  amount: string
  website: string
  icon: string
  owner: string
  explorerUrl?: string
}

export namespace WalletConnect {
  export enum Events {
    AccountChanged = 'accountChanged',
    AddressesChagned = 'addressesChagned',
    ChainChanged = 'chainChanged',
  }

  export interface Account {
    name: string
    accounts: Array<string>
    chains: Array<`ckb:${'testnet' | 'devnet'}`>
    events: [
      Events.AccountChanged,
      Events.AddressesChagned,
      Events.ChainChanged,
    ]
    methods: ['ckb_getAddresses', 'ckb_signTransaction', 'ckb_signMessage']
    topic: string
  }
}

export interface AddressHashParams {
  addressHash: string
}

export type TokenCreateData = {
  name: string
  account: string // the address of owner
  decimal: string
  description: string
  website: string
  icon: string
  amount: string
  email: string
  explorerCode?: string
}

export type TokenUpdateData = Omit<TokenCreateData, 'account'>

export type TokenTransferParams = {
  from: string[]
  amount: string
  to: string
}

export type TokenMintParams = {
  to: string
  amount: string
}

export type History = {
  txHash: string
  from: string
  to: string
  time: string
  status: string
  sudtAmount: string
  CKBAmount: string
  url: string
}
