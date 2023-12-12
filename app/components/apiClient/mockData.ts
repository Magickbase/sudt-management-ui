import type { Transaction, Assets, Token, ServerTransaction } from '@/app/type'
// import type { RawTransaction } from '@ckb-lumos/base'

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
    typeId: '1',
    displayName: 'CKB',
    uan: 'CKB',
    decimal: '8',
    amount: '10000000000',
  },
  {
    typeId: '2',
    displayName: 'SUDT1',
    uan: 'SUDT1',
    decimal: '8',
    amount: '10000000000',
  },
  {
    typeId: '3',
    displayName: 'SUDT2',
    uan: 'SUDT2',
    decimal: '8',
    amount: '20000000000',
  },
  {
    typeId: '4',
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
    typeId: '1',
    amount: '10000',
    description: '',
    website: '',
    icon: '',
  },
  {
    typeId: '2',
    amount: '10000',
    symbol: 'SUDT2',
    decimal: '8',
    name: 'Demo Simple User Define Token',
    email: '123@gmail.com',
    description: '',
    website: '',
    icon: '',
  },
  {
    typeId: '3',
    amount: '10000',
    symbol: 'SUDT3',
    decimal: '8',
    name: 'Demo Simple User Define Token',
    email: '123@gmail.com',
    description: '',
    website: '',
    icon: '',
  },
]

export const MOCK_RAW_TRANSACTION: ServerTransaction = {
  cellDeps: [
    {
      outPoint: {
        txHash:
          '0xec26b0f85ed839ece5f11c4c4e837ec359f5adc4420410f6453b1f6b60fb96a6',
        index: '0x0',
      },
      depType: 'depGroup',
    },
    {
      outPoint: {
        txHash:
          '0xe12877ebd2c3c364dc46c5c992bcfaf4fee33fa13eebdf82c591fc9825aab769',
        index: '0x0',
      },
      depType: 'code',
    },
  ],
  headerDeps: [],
  inputs: [
    {
      cellOutput: {
        capacity: '0x90fcedc3f20',
        lock: {
          codeHash:
            '0x3419a1c09eb2567f6552ee7a8ecffd64155cffe0f1796e6e61ec088d740c1356',
          hashType: 'type',
          args: '0x1b3e74a036a21f94eba3d7c94b9d5619e1e84f7c',
        },
      },
      data: '0x',
      outPoint: {
        txHash:
          '0x6827d1fb91b10d589303e66ec574bde9f4b1ca6eacbd05c475cd194391e6fc78',
        index: '0x1',
      },
      blockNumber: '0xb0d5de',
    },
  ],
  outputs: [
    {
      cellOutput: {
        capacity: '0x34e62ce00',
        lock: {
          codeHash:
            '0x3419a1c09eb2567f6552ee7a8ecffd64155cffe0f1796e6e61ec088d740c1356',
          hashType: 'type',
          args: '0x1b3e74a036a21f94eba3d7c94b9d5619e1e84f7c',
        },
        type: {
          codeHash:
            '0xc5e5dcf215925f7ef4dfaf5f4b4f105bc321c02776d6e7d52a1db3fcd9d011a4',
          hashType: 'type',
          args: '0x0226fc667898d411d97a2603210b3636737b18b8d36bebad98c3eeca7562acdb',
        },
      },
      data: '0xa0860100000000000000000000000000',
    },
    {
      cellOutput: {
        lock: {
          codeHash:
            '0x3419a1c09eb2567f6552ee7a8ecffd64155cffe0f1796e6e61ec088d740c1356',
          hashType: 'type',
          args: '0x1b3e74a036a21f94eba3d7c94b9d5619e1e84f7c',
        },
        capacity: '0x90c8077ea80',
      },
      data: '0x',
    },
  ],
  witnesses: [
    '0x55000000100000005500000055000000410000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  ],
  fixedEntries: [
    {
      field: 'outputs',
      index: 0,
    },
  ],
  signingEntries: [],
  inputSinces: {},
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
