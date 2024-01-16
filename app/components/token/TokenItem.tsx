import type { FC, DetailedHTMLProps, HTMLAttributes } from 'react'
import { Token } from '@/app/type'
import Link from 'next/link'
import { useAccount } from '@/app/hooks/useAccount'

interface TokenItemProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  token: Token
}

export const TokenItem: FC<TokenItemProps> = ({
  token,
  className,
  ...attrs
}) => {
  const { addressHash } = useAccount()

  return (
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
        <Link href={`/token/${token.typeId}/info`}>View</Link>
        {token.owner === addressHash && (
          <Link href={`/token/${token.typeId}/modify`}>Modify</Link>
        )}
        {token.owner === addressHash && (
          <Link href={`/token/${token.typeId}/mint`}>Mint</Link>
        )}
      </div>
    </div>
  )
}
