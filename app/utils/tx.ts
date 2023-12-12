import { ServerTransaction } from '@/app/type'
import { Script } from '@ckb-lumos/base'
import { computeScriptHash as scriptToHash } from '@ckb-lumos/base/lib/utils'
import type { Transaction } from '@ckb-connect/walletconnect-dapp-sdk'

type TransactionScript = Transaction['inputs'][number]['lock']

const transformScript = (script: Script): TransactionScript => {
  return {
    args: script.args,
    codeHash: script.codeHash,
    hashType: (script.hashType === 'type' ? 'type' : 'data') as 'type' | 'data',
  }
}

export function transformTx(txSkeleton: ServerTransaction): Transaction {
  return {
    version: '0x0',
    fee: '1000',
    description: '',
    cellDeps: txSkeleton.cellDeps,
    headerDeps: txSkeleton.headerDeps,
    inputs: txSkeleton.inputs.map((input, i) => ({
      previousOutput: input.outPoint!,
      since:
        txSkeleton.inputSinces[i.toString()] ||
        txSkeleton.inputSinces[i] ||
        '0x0',
      capacity: input.cellOutput.capacity,
      lock: transformScript(input.cellOutput.lock),
      lockHash: scriptToHash(input.cellOutput.lock),
    })),
    outputs: txSkeleton.outputs.map((output) => ({
      capacity: output.cellOutput.capacity,
      lock: transformScript(output.cellOutput.lock),
      type: (output.cellOutput.type
        ? transformScript(output.cellOutput.type)
        : undefined) as TransactionScript,
    })),
    outputsData: txSkeleton.outputs.map((output) => output.data),
    witnesses: txSkeleton.witnesses,
  }
}
