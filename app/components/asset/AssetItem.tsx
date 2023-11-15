import type { FC, DetailedHTMLProps, HTMLAttributes } from 'react'
import { formatAmount } from '@/app/utils'
import type { Assets } from '@/app/type'

interface AssetItemProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  asset: Assets
}

export const AssetItem: FC<AssetItemProps> = ({
  asset,
  className,
  ...attrs
}) => (
  <div
    {...attrs}
    className={`${
      className ?? ''
    } cursor-pointer w-full flex bg-lighter-color p-3 rounded-lg text-sm`}
  >
    <span>{asset.displayName}</span>
    <span className="ml-auto mr-1">
      {formatAmount(asset.amount, asset.decimal)}
    </span>
    <img src="/icons/more.svg" alt="more" />
  </div>
)
