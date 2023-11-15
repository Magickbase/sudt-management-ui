import {
  Token,
  Assets,
  AddressHashParams,
  TokenCreateData,
  TokenTransferParams,
  TokenMintParams,
  Transaction,
} from '@/app/type'
import { RawTransaction } from '@ckb-lumos/base'
import { APIClient, APIClientOptions } from './base'
import { MockApi } from './mock'

export class SUDTApi extends APIClient {
  constructor(opts: APIClientOptions) {
    super(opts)
  }

  token = {
    list: (params: Partial<AddressHashParams>) =>
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
    asyncAddress: (addressHash: string, addresses: string[]) =>
      this.post(`/account/${addressHash}`, { addresses }),
    listAssets: (addressHash: string) =>
      this.get<Assets[]>(`/account/${addressHash}/assets`),
    transferHistory: (addressHash: string) =>
      this.get<Transaction[]>(
        `/account/${addressHash}/assets/transfer/history`,
      ),
  }
}

export type { APIClientOptions }

const options = {
  origin: process.env.NEXT_PUBLIC_API_ENDPOINT || '/',
}

export const sudtApi =
  process.env.NEXT_PUBLIC_MOCK_API === 'true'
    ? new MockApi(options)
    : new SUDTApi(options)
