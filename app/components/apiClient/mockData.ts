import type { Transaction, Assets, Token } from '@/app/type'
import type { RawTransaction } from '@ckb-lumos/base'

export const MOCK_ACCOUNTS: {
  [namke: string]: Record<'address' | 'balance', string>
} = {
  self: {
    address:
      'ckt1qzda0cr08m85hc8jlnfp3zer7xulejywt49kt2rr0vthywaa50xwsq0dnd72kh63g08574r38qkyph2ewl9ummcfp6znk',
    balance: '48642877372524671',
  },
  alice: {
    address:
      'ckb1qzjrnpmgmpaaz7h2zds7msave44qz9mhfhzwhjqnh7sh869vp5yx6qgqwhrzgpkxkxqd3llfvsqd0uywd6yarpkuqqu2gqs3',
    balance: '48642877372524671',
  },
  bob: {
    address:
      'ckb1qqwqfhcfmxk7medlcs8lrgu68gtler3f79w9dutt0eyxsrrqpmj6cqwqge9mksrygxm9r6zd9vstk0fvngxqtav4kpfmssy6vplx24rhtu7frlmk',
    balance: '48642877372524671',
  },
  charlie: {
    address:
      'ckb1qzda0cr08m85hc8jlnfp3zer7xulejywt49kt2rr0vthywaa50xwsqdy46j0t82lw0pwlc4y3m8w5mp2k5c633c34jr96',
    balance: '48642877372524671',
  },
}

export const MOCK_ASSETS: Assets[] = [
  {
    displayName: 'CKB',
    uan: 'CKB',
    decimal: '8',
    amount: '10000000000',
  },
  {
    displayName: 'SUDT1',
    uan: 'SUDT1',
    decimal: '8',
    amount: '10000000000',
  },
  {
    displayName: 'SUDT2',
    uan: 'SUDT2',
    decimal: '8',
    amount: '20000000000',
  },
  {
    displayName: 'SUDT3',
    uan: 'SUDT3',
    decimal: '8',
    amount: '30000000000',
  },
]

export const MOCK_TOKENS: Token[] = [
  {
    symbol: 'SUDT1',
    decimal: '8',
    name: 'Demo Simple User Define Token',
    email: '123@gmail.com',
    description: '',
    website: '',
    icon: '',
  },
  {
    symbol: 'SUDT2',
    decimal: '8',
    name: 'Demo Simple User Define Token',
    email: '123@gmail.com',
    description: '',
    website: '',
    icon: '',
  },
  {
    symbol: 'SUDT3',
    decimal: '8',
    name: 'Demo Simple User Define Token',
    email: '123@gmail.com',
    description: '',
    website: '',
    icon: '',
  },
]

export const MOCK_RAW_TRANSACTION: RawTransaction = {
  version: '0x0',
  cellDeps: [
    {
      outPoint: {
        txHash:
          '0xbcdb11e9815b3d9fb6278af097e2ae54fe4f8c9c97d352d8a15538ed0398ac83',
        index: '0x1',
      },
      depType: 'depGroup',
    },
    {
      outPoint: {
        txHash:
          '0xbcdb11e9815b3d9fb6278af097e2ae54fe4f8c9c97d352d8a15538ed0398ac83',
        index: '0x0',
      },
      depType: 'depGroup',
    },
  ],
  headerDeps: [],
  inputs: [
    {
      since: '0x0',
      previousOutput: {
        txHash:
          '0xa401e0b880329ea492e95f3fc085fe03e33a66f5e010aadbf8fcd0d5ecc09e5f',
        index: '0x0',
      },
    },
    {
      since: '0x0',
      previousOutput: {
        txHash:
          '0x3fdc5faa485a9687dcf7b12445cb77376798cbbc6efbc9fd5e8e22589c385921',
        index: '0x1',
      },
    },
  ],
  outputs: [
    {
      capacity: '0x2540be400',
      lock: {
        codeHash:
          '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',
        hashType: 'type',
        args: '0x6cd8ae51f91bacd7910126f880138b30ac5d3015',
      },
    },
    {
      capacity: '0x5af0bc6e5c00',
      lock: {
        codeHash:
          '0x5c5069eb0857efc65e1bca0c07df34c31663b3622fd3876c876320fc9634e2a8',
        hashType: 'type',
        args: '0x8bebce3e7dd7b7179defe4d06ecf9776b1ba686d',
      },
    },
    {
      capacity: '0x1bc0b78127dd9f00',
      lock: {
        codeHash:
          '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',
        hashType: 'type',
        args: '0xe390d4b9b4c7637ec80799bdaf644ae625cdb922',
      },
    },
  ],
  outputsData: ['0x', '0x', '0x'],
}

export const MOCK_TRANSACTION: Transaction[] = [
  {
    type: 'from',
    txHash:
      '0xf83c104f4d478f72ec443d36efa11a4d2bee31735f8a86b07e713eea195fd328',
    txStatus: 'pending',
    displayInputs: [
      {
        address: MOCK_ACCOUNTS['alice'].address,
        cellType: 'udt',
        capacity: '31800000000.0',
        extraInfo: {
          symbol: 'SUDT1',
          amount: '1000',
          decimal: '0',
        },
      },
    ],
    displayOutputs: [
      {
        address: MOCK_ACCOUNTS['self'].address,
        cellType: 'udt',
        capacity: '31800000000',
        extraInfo: {
          symbol: 'SUDT1',
          amount: '1000',
          decimal: '0',
        },
      },
    ],
  },
  {
    type: 'to',
    txHash:
      '0x4ca389777c2cd4aea19b9760068be379824b956e34acd33fff5154a67c959eff',
    txStatus: 'committed',
    blockTimestamp: '1695179332694',
    displayInputs: [
      {
        address: MOCK_ACCOUNTS['self'].address,
        cellType: 'udt',
        capacity: '31800000000',
        extraInfo: {
          symbol: 'SUDT1',
          amount: '1000',
          decimal: '0',
        },
      },
    ],
    displayOutputs: [
      {
        address: MOCK_ACCOUNTS['alice'].address,
        cellType: 'udt',
        capacity: '31800000000.0',
        extraInfo: {
          symbol: 'SUDT1',
          amount: '1000',
          decimal: '0',
        },
      },
    ],
  },
  {
    type: 'mint',
    txHash:
      '0x1ebe22fe7d9740e56998b6b874aac985af4ca4040d82b251951fb536f405244d',
    txStatus: 'committed',
    blockTimestamp: '1695141801708',
    displayInputs: [
      {
        address: MOCK_ACCOUNTS['self'].address,
        cellType: 'normal',
        capacity: '60000000000',
      },
    ],
    displayOutputs: [
      {
        address: MOCK_ACCOUNTS['alice'].address,
        cellType: 'udt',
        capacity: '30000000000.0',
        extraInfo: {
          symbol: 'SUDT1',
          amount: '1000',
          decimal: '0',
        },
      },
      {
        address: MOCK_ACCOUNTS['self'].address,
        cellType: 'udt',
        capacity: '30000000000.0',
        extraInfo: {
          symbol: 'SUDT1',
          amount: '1000',
          decimal: '0',
        },
      },
    ],
  },
]
