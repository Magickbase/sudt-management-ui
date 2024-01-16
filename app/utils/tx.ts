import { ServerTransaction } from '@/app/type'
import { Script, DepType } from '@ckb-lumos/base'
import { computeScriptHash as scriptToHash } from '@ckb-lumos/base/lib/utils'
import { CKBComponents } from '@ckb-lumos/rpc/lib/types/api'
import { ParamsFormatter } from '@ckb-lumos/rpc'
import { BI } from '@ckb-lumos/bi'

import type {
  Transaction,
  SignedTransaction,
} from '@ckb-connect/walletconnect-dapp-sdk'

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

export function transformSignedTx(
  signedTx: SignedTransaction['transaction'],
): CKBComponents.RawTransaction {
  return {
    version: '0x0',
    cellDeps: signedTx.cellDeps.map((cellDep) => ({
      outPoint: {
        index: ParamsFormatter.toHash(cellDep.outPoint.index),
        txHash: cellDep.outPoint.txHash,
      },
      depType: cellDep.depType as DepType,
    })),
    headerDeps: signedTx.headerDeps,
    inputs: signedTx.inputs.map((input) => ({
      previousOutput: {
        index: ParamsFormatter.toHash(input.previousOutput.index),
        txHash: input.previousOutput.txHash,
      },
      since: ParamsFormatter.toHash(input.since),
    })),
    outputs: signedTx.outputs.map((output) => ({
      capacity: BI.from(parseInt(output.capacity)).toHexString(),
      lock: output.lock,
      type: output.type,
    })),
    outputsData: signedTx.outputsData,
    witnesses: signedTx.witnesses,
  }
}
