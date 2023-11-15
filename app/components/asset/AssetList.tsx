import type { FC, DetailedHTMLProps, HTMLAttributes } from 'react'
import classnames from 'classnames'
import { AssetItem } from './AssetItem'
import useSWR from 'swr'
import { sudtApi } from '../apiClient'
import { useAccount } from '@/app/hooks/useAccount'

interface AssetListProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const AssetList: FC<AssetListProps> = ({ className, ...attrs }) => {
  const { addressHash } = useAccount()
  const { data: assets } = useSWR(['assets'], () =>
    sudtApi.account.listAssets(addressHash),
  )

  if (!assets) {
    return null
  }

  return (
    <div {...attrs} className={classnames(className, 'gap-2 flex flex-col')}>
      {assets.map((asset) => (
        <AssetItem key={asset.uan} asset={asset} />
      ))}
    </div>
  )
}
