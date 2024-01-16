import type { FC, DetailedHTMLProps, HTMLAttributes } from 'react'
import classnames from 'classnames'
import { AssetItem } from './AssetItem'
import useSWR from 'swr'
import { sudtApi } from '../apiClient'
import { useAccount } from '@/app/hooks/useAccount'
import Link from 'next/link'

interface AssetListProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const AssetList: FC<AssetListProps> = ({ className, ...attrs }) => {
  const { addressHash } = useAccount()
  const { data: assets } = useSWR(
    addressHash ? ['assets', addressHash] : null,
    () => sudtApi.account.listAssets(addressHash),
  )

  if (!assets) {
    return null
  }

  return (
    <div {...attrs} className={classnames(className, 'gap-2 flex flex-col')}>
      {assets.map((asset) => (
        <Link href={`/token/${asset.typeId}`} key={asset.uan}>
          <AssetItem asset={asset} />
        </Link>
      ))}
    </div>
  )
}
