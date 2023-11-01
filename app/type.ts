export type TransactionNormalCell = {
  cellType: 'normal'
  addressHash: string
  capacity: string
}

export type UdtInfo = {
  amount: string
  decimal: string
  symbol: string
}

export type TransactionUdtCell = {
  cellType: 'udt'
  addressHash: string
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
  symbol: string
}

export type Token = {
  symbol: string
  decimal: string
  name: string
  email: string
  description: string
  website: string
}

export namespace WalletConnect {
  export interface AddressItem {
    address: string
    identifier: string
    description: string
    index: number
  }

  export enum Events {
    AccountChanged = 'accountChanged',
    AddressesChagned = 'addressesChagned',
    ChainChanged = 'chainChanged',
  }

  export interface Account {
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

  // TODO: can be introduced from SDK
  export interface Transaction {
    cellDeps: Array<any>
    headerDeps: Array<any>
    inputs: Array<any>
    outputs: Array<any>
    description: string
    version: '0'
    fee: string
    outputsData: Array<string>
  }

  // TODO can be introduced from SDK
  export interface SignedTransaction {
    transaction: Transaction & {
      witnesses: string[]
      signatures: {
        [hash: string]: Array<string>
      }
    }
    status: string
  }
}
