import type { FC, DetailedHTMLProps, HTMLAttributes } from "react";
import { parseAmount } from '@/app/utils'

interface AssetItemProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  asset: {
    symbol: string;
    decimal: string;
    amount: string;
  };
}

export const AssetItem: FC<AssetItemProps> = ({
  asset,
  className,
  ...attrs
}) => (
  <div
    {...attrs}
    className={`${
      className ?? ""
    } cursor-pointer w-full flex bg-lighter-color p-[12px] rounded-lg text-sm`}
  >
    <span>{asset.symbol}</span>
    <span className="ml-auto mr-1">{parseAmount(asset.amount, asset.decimal)}</span>
    <img src="/icons/more.svg" alt="more" />
  </div>
);
