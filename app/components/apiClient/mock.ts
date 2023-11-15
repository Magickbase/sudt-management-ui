import {
  AddressHashParams,
  TokenCreateData,
  TokenTransferParams,
  TokenMintParams,
  History,
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
    update: (data: TokenCreateData) =>
      Promise.resolve(
        MOCK_TOKENS.find((token) => token.symbol === data.symbol),
      ),
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
