import {
  type FC,
  type DetailedHTMLProps,
  type HTMLAttributes,
  useMemo,
} from 'react'
import classnames from 'classnames'
import { type HistoryCell } from '@/app/type'
import { parseAmount, formatAmount, ellipsisTextMiddle } from '@/app/utils'

interface HistoryCellProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  cell: HistoryCell
  index: number
}

export const HistoryCellItem: FC<HistoryCellProps> = ({
  cell,
  index,
  className,
  ...attrs
}) => {
  const cellType = useMemo(() => {
    if (cell.token !== undefined) {
      return cell.token.name
    }

    return 'CKB Capacity'
  }, [cell])

  const cellData = useMemo(() => {
    if (cell.token !== undefined) {
      return `${parseAmount(cell.amount, cell.token.decimal).toFormat()} Unit`
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
        <span className="ml-auto">{formatAmount(cell.ckb, '8')} CKB</span>
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
