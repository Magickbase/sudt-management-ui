import type { FC, DetailedHTMLProps, HTMLAttributes } from 'react'
import BigNumber from 'bignumber.js'
import dayjs from 'dayjs'
import classnames from 'classnames'
import Link from 'next/link'
import {
  type ServerHistory,
  type HistoryCell,
  type UdtCell,
  TYPE_LABEL_MAP,
} from '@/app/type'
import { parseAmount, formatAmount, ellipsisTextMiddle } from '@/app/utils'
import { useAccount } from '@/app/hooks/useAccount'

interface HistoryItemProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  history: ServerHistory
  typeId?: string
}

export const HistoryItem: FC<HistoryItemProps> = ({
  history,
  typeId,
  className,
  ...attrs
}) => {
  const { addressList } = useAccount()
  const addressMap: Record<string, boolean> = addressList.reduce(
    (a, b) => ({ ...a, [b.address]: true }),
    {},
  )
  const inputUdts = history.from.filter((cell) => cell.token) as UdtCell[]

  const outputUdts = history.to.filter((cell) => cell.token) as UdtCell[]

  const udtMaps = (() => {
    const input = inputUdts.reduce(
      (a, b) => ({
        ...a,
        [b.token.typeId]: b.token,
      }),
      {} as { [typeId: string]: UdtCell['token'] },
    )

    const output = outputUdts.reduce(
      (a, b) => ({
        ...a,
        [b.token.typeId]: b.token,
      }),
      {} as { [typeId: string]: UdtCell['token'] },
    )

    const allUdtTypeIds = Array.from(
      new Set([...Object.keys(input), ...Object.keys(output)]),
    )

    return allUdtTypeIds.reduce(
      (a, b) => ({
        ...a,
        [b]: input[b] ?? output[b],
      }),
      {} as { [typeId: string]: UdtCell['token'] },
    )
  })()

  const bills: {
    ckb: string
    udts: { typeId: string; amount: string }[]
  } = (() => {
    const selfInputs = history.from.filter((cell) => addressMap[cell.address])
    const selfOutputs = history.to.filter((cell) => addressMap[cell.address])

    const ckbInputAmount = selfInputs.reduce((a, b) => {
      return a.plus(parseAmount(b.ckb, '8'))
    }, new BigNumber(0))
    const ckbOutputAmount = selfOutputs.reduce((a, b) => {
      return a.plus(parseAmount(b.ckb, '8'))
    }, new BigNumber(0))

    const udtsInputAmount = (
      selfInputs.filter((cell) => typeof cell.token === 'object') as UdtCell[]
    ).reduce(
      (a, b) => ({
        ...a,
        [b.token.typeId]: (a[b.token.typeId] ?? new BigNumber(0)).plus(
          parseAmount(b.amount, b.token.decimal),
        ),
      }),
      {} as { [typeId: string]: BigNumber },
    )

    const udtsOutputAmount = (
      selfOutputs.filter((cell) => typeof cell.token === 'object') as UdtCell[]
    ).reduce(
      (a, b) => ({
        ...a,
        [b.token.typeId]: (a[b.token.typeId] ?? new BigNumber(0)).plus(
          parseAmount(b.amount, b.token.decimal),
        ),
      }),
      {} as { [typeId: string]: BigNumber },
    )

    const allUdtTypeIds = Array.from(
      new Set([
        ...Object.keys(udtsInputAmount),
        ...Object.keys(udtsOutputAmount),
      ]),
    )

    return {
      ckb: ckbOutputAmount.minus(ckbInputAmount).toString(),
      udts: allUdtTypeIds.map((typeId) => ({
        typeId,
        amount: (udtsOutputAmount[typeId] ?? new BigNumber(0))
          .minus(udtsInputAmount[typeId] ?? new BigNumber(0))
          .toString(),
      })),
    }
  })()

  const historyType: 'from' | 'to' | 'mint' = (() => {
    if (typeId && bills.udts.find((udt) => udt.typeId === typeId)) {
      const billItem = bills.udts.find((udt) => udt.typeId === typeId)
      if (billItem?.amount[0] === '-') {
        return 'to'
      }

      const inputUdtCell = history.from.filter(
        (cell) => typeof cell.token === 'object',
      ) as UdtCell[]

      if (inputUdtCell.find((cell) => cell.token.typeId === typeId)) {
        return 'from'
      }

      return 'mint'
    }

    if (bills.ckb[0] === '-') {
      return 'from'
    }

    return 'to'
  })()

  const displayCells = (() => {
    if (historyType === 'from') {
      return history.from
    }
    if (historyType === 'mint') {
      return history.to.filter((cell) => cell.token?.typeId === typeId)
    }
    return history.to
  })()

  return (
    <div
      {...attrs}
      className={`${
        className ?? ''
      } w-full flex flex-col bg-lighter-color p-3 rounded-lg text-sm`}
    >
      <div className="flex mb-2">
        <Link
          className="text-primary-color font-medium"
          href={`/history/${history.txHash}`}
        >
          {ellipsisTextMiddle(history.txHash)}
        </Link>
        {/* <span
          className={classnames('ml-auto text-xs', {
            'text-orange-400': transaction.txStatus !== 'committed',
          })}
        >
          {transaction.txStatus === 'committed'
            ? dayjs(parseInt(transaction.blockTimestamp || '0')).format(
                'YYYY.MM.DD HH:MM:SS',
              )
            : transaction.txStatus}
        </span> */}
      </div>
      <div className="text-secondary-color">
        {TYPE_LABEL_MAP[historyType]}:{' '}
        {ellipsisTextMiddle(displayCells[0].address)}{' '}
        {displayCells.length > 1 && `(+${displayCells.length - 1} Addresses)`}
      </div>
      <div className="flex flex-col gap-1 border-t-[1px] border-solid border-secondary-color pt-2 mt-2">
        {bills.udts.map((udt) => (
          <div className="ml-auto text-highlight-color" key={udt.typeId}>
            {udt.amount[0] === '-' ? '' : '+'}
            {udt.amount} {udtMaps[udt.typeId]!.name}
          </div>
        ))}
        <div className="ml-auto text-secondary-color text-xs">
          {bills.ckb[0] === '-' ? '' : '+'}
          {formatAmount(bills.ckb, '0')} CKB
        </div>
      </div>
    </div>
  )
}
