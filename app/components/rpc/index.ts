import { RPC } from '@ckb-lumos/rpc'

export const ckbRpc = new RPC(process.env.NEXT_PUBLIC_CKB_RPC_URL || '')
