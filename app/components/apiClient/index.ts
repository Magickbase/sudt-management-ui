import { Token, Assets } from '@/app/type'
import { RawTransaction } from '@ckb-lumos/base'
import { APIClient, APIClientOptions } from './base'

interface AddressParams {
  address: string
}

type TokenCreateData = {
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

type TokenTransferParams = {
  token: string // token args
  amount: string
  to: string
}

type TokenMintParams = {
  from: string[]
  to: string
  amount: string
}

type History = {
  txHash: string
  from: string
  to: string
  time: string
  status: string
  sudtAmount: string
  CKBAmount: string
  url: string
}

export class SUDTApi extends APIClient {
  constructor(opts: APIClientOptions) {
    super(opts)
  }

  token = {
    list: (params: Partial<AddressParams>) =>
      this.get<Token[]>(`/token?${new URLSearchParams(params)}`),
    detail: (args: string) => this.get<Token>(`/token/${args}`),
    create: (data: TokenCreateData) =>
      this.post<TokenCreateData, RawTransaction>('/token', data),
    update: (data: TokenCreateData) =>
      this.put<TokenCreateData, Token>('/token', data),
    transfer: (data: TokenTransferParams) =>
      this.post<TokenTransferParams, RawTransaction>('/token/transfer', data),
    mint: (typeId: string, params: TokenMintParams) =>
      this.post<TokenMintParams, RawTransaction>(
        `/token/mint/${typeId}/`,
        params,
      ),
  }

  account = {
    listAssets: (address: string) =>
      this.get<Assets[]>(`/account/${address}/assets`),
    transferHistory: (address: string) =>
      this.get<History[]>(`/account/${address}/assets/transfer/history`),
  }
}

export type { APIClientOptions }

const options = {
  origin: process.env.NEXT_PUBLIC_API_ENDPOINT || '/',
}

export const sudtApi = new SUDTApi(options)
