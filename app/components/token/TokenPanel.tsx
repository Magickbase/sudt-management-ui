import {
  type FC,
  type DetailedHTMLProps,
  type HTMLAttributes,
  useState,
} from 'react'
import useSWR from 'swr'
import { TokenItem } from './TokenItem'
import { Toggle } from '@/app/components/switch'
import { Button } from '@/app/components/button'
import { sudtApi } from '@/app/components/apiClient'
import { useAccount } from '@/app/hooks/useAccount'

interface TokenPanelProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const TokenPanel: FC<TokenPanelProps> = ({ ...attrs }) => {
  const [autodetect, setAutodetect] = useState(false)
  const { addressHash } = useAccount()
  const {
    data: tokens,
    error,
    isLoading,
  } = useSWR(['tokens', addressHash], () => sudtApi.token.list({ addressHash }))

  if (!tokens) {
    return null
  }

  if (autodetect) {
    return (
      <div {...attrs}>
        <div className="gap-2 flex flex-col">
          {tokens.map((token) => (
            <TokenItem token={token} key={token.symbol} />
          ))}
        </div>

        <div className="flex items-center mt-6">
          Autodetect Tokens
          <Toggle className="ml-auto" enabled={autodetect} />
        </div>
      </div>
    )
  }

  return (
    <div {...attrs}>
      <h3 className="font-sm text-highlight-color mb-4">Autodetect Tokens</h3>
      <p className="font-xs mb-4">
        We use third-party APIs to detect Tokens on CKB network, which means
        your IP address may be exposed to centralized servers.
      </p>
      <Button primary block onClick={() => setAutodetect(true)}>
        Turn On
      </Button>
    </div>
  )
}
