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
    <Link className="ml-1" href={`/token/${token.symbol}`}>
      <img src="/icons/open.svg" alt="open" />
    </Link>
    <div className="ml-auto flex gap-1 text-primary-color">
      <a className="cursor-pointer">Distribution</a>
      <Link href={`/token/${token.symbol}`}>View</Link>
      <Link href={`/token/${token.symbol}/modify`}>Modify</Link>
      <Link href={`/token/${token.symbol}/mint`}>Mint</Link>
    </div>
  </div>
)
