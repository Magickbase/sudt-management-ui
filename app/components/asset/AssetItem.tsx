import type { FC, DetailedHTMLProps, HTMLAttributes } from "react";
import { parseUDTAmount } from '@/app/utils/number'

interface AssetItemProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  asset: {
    symbol: string;
    decimal: number;
    amount: number;
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
    <span className="ml-auto mr-1">{parseUDTAmount(asset.amount.toString(), asset.decimal.toString())}</span>
    <img src="/icons/more.svg" alt="more" />
  </div>
);
