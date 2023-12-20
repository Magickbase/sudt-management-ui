import type { FC, DetailedHTMLProps, HTMLAttributes } from 'react'
import { Token } from '@/app/type'
import Link from 'next/link'

interface TokenItemProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  token: Token
}

export const TokenItem: FC<TokenItemProps> = ({
  token,
  className,
  ...attrs
}) => (
  <div
    {...attrs}
    className={`${
      className ?? ''
    } w-full flex items-center bg-lighter-color p-3 rounded-lg text-sm`}
  >
    <span>{token.symbol}</span>

    {token.explorerUrl && (
      <Link className="ml-1" href={token.explorerUrl} target="_blank">
        <img src="/icons/open.svg" alt="open" />
      </Link>
    )}
    <div className="ml-auto flex gap-1 text-primary-color">
      {/* <a className="cursor-pointer">Distribution</a> */}
      <Link href={`/token/${token.typeId}`}>View</Link>
      <Link href={`/token/${token.typeId}/modify`}>Modify</Link>
      <Link href={`/token/${token.typeId}/mint`}>Mint</Link>
    </div>
  </div>
)
