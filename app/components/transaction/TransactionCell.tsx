import {
  type FC,
  type DetailedHTMLProps,
  type HTMLAttributes,
  useMemo,
} from 'react'
import classnames from 'classnames'
import { type TransactionCell } from '@/app/type'
import { parseAmount, formatAmount, ellipsisTextMiddle } from '@/app/utils'

interface TransactionCellProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  cell: TransactionCell
  index: number
}

export const TransactionCellItem: FC<TransactionCellProps> = ({
  cell,
  index,
  className,
  ...attrs
}) => {
  const cellType = useMemo(() => {
    if (cell.cellType === 'udt') {
      return cell.extraInfo.symbol
    }

    return 'CKB Capacity'
  }, [cell])

  const cellData = useMemo(() => {
    if (cell.cellType === 'udt') {
      return `${parseAmount(
        cell.extraInfo.amount,
        cell.extraInfo.decimal,
      ).toFormat()} Unit`
    }

    return '-'
  }, [cell])

  return (
    <div {...attrs} className={classnames(className, 'gap-2 flex flex-col')}>
      <div className="flex">
        <span className="text-secondary-color">#{index}</span>
        <span className="flex ml-auto text-primary-color">
          <img src="/icons/right.svg" alt="right" className="mr-2" />
          {ellipsisTextMiddle(cell.address, { prefix: 10, suffix: 10 })}
        </span>
      </div>
      <div className="flex">
        <span className="text-secondary-color">Cell Type</span>
        <span className="ml-auto">{cellType}</span>
      </div>

      <div className="flex">
        <span className="text-secondary-color">Capacity</span>
        <span className="ml-auto">{formatAmount(cell.capacity, '8')} CKB</span>
      </div>

      <div className="flex">
        <span className="text-secondary-color">Data</span>
        <span className="ml-auto">{cellData}</span>
      </div>

      <div className="flex">
        <span className="ml-auto">Cell Info</span>
      </div>
    </div>
  )
}
