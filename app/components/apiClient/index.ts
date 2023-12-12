import {
  Token,
  Assets,
  AddressHashParams,
  TokenCreateData,
  TokenUpdateData,
  TokenTransferParams,
  TokenMintParams,
  Transaction,
  ServerTransaction,
} from '@/app/type'
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
      this.post<TokenCreateData, ServerTransaction>('/token', data),
    update: (typeId: string, data: TokenUpdateData) =>
      this.put<TokenUpdateData, Token>(`/token/${typeId}`, data),
    transfer: (typeId: string, data: TokenTransferParams) =>
      this.post<TokenTransferParams, ServerTransaction>(
        `/token/send/${typeId}/`,
        data,
      ),
    mint: (typeId: string, params: TokenMintParams) =>
      this.post<TokenMintParams, ServerTransaction>(
        `/token/mint/${typeId}/`,
        params,
      ),
  }

  account = {
    meta: (addressHash: string) =>
      this.get<{ capacity: string }>(`/account/meta/${addressHash}`),
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
