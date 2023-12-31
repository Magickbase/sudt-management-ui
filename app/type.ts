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
}

export type Token = {
  symbol: string
  decimal: string
  name: string
  email: string
  description: string
  website: string
  icon: string
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
  symbol: string
  supply: string
  account: string // the address of owner
  decimal: string
  description: string
  website: string
  icon: string
  typeId: string
  explorerCode: string
  args: string // the args of sudt type script
  uan: string
  displayName: string
  email: string
}

export type TokenTransferParams = {
  addressHash: string
  token: string // token args
  amount: string
  to: string
}

export type TokenMintParams = {
  from: string[]
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
