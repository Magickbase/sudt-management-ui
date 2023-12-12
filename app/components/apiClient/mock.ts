import {
  AddressHashParams,
  TokenCreateData,
  TokenTransferParams,
  TokenMintParams,
  TokenUpdateData,
} from '@/app/type'
import { APIClient } from './base'
import {
  MOCK_TOKENS,
  MOCK_RAW_TRANSACTION,
  MOCK_ASSETS,
  MOCK_TRANSACTION,
} from './mockData'

export class MockApi extends APIClient {
  token = {
    list: (_: Partial<AddressHashParams>) => Promise.resolve(MOCK_TOKENS),
    detail: (args: string) =>
      Promise.resolve(MOCK_TOKENS.find((token) => token.symbol === args)),
    create: (_: TokenCreateData) => Promise.resolve(MOCK_RAW_TRANSACTION),
    update: (typeId: string, data: TokenUpdateData) =>
      Promise.resolve(MOCK_TOKENS.find((token) => token.typeId === typeId)),
    transfer: (_: TokenTransferParams) => Promise.resolve(MOCK_RAW_TRANSACTION),
    mint: (_: string, __: TokenMintParams) =>
      Promise.resolve(MOCK_RAW_TRANSACTION),
  }

  account = {
    asyncAddress: (addressHash: string, addresses: string[]) =>
      Promise.resolve(),
    listAssets: (addressHash: string) => Promise.resolve(MOCK_ASSETS),
    transferHistory: (addressHash: string) => Promise.resolve(MOCK_TRANSACTION),
  }
}
