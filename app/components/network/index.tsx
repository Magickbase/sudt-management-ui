import type { FC, ButtonHTMLAttributes, PropsWithChildren } from 'react'
import { PrimaryButton } from '../button'

export const NetworkItem: FC<PropsWithChildren<{ isMainnet?: boolean } & ButtonHTMLAttributes<HTMLButtonElement>>> = ({
  children,
  className,
  isMainnet,
  ...attrs
}) => {
  const color = isMainnet ? 'primary-color' : 'white'
  return (
    <PrimaryButton {...attrs} className={`bg-transparent border-[1px] text-${color} border-current`}>
      {children}
    </PrimaryButton>
  )
}
