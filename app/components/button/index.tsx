import type { FC, ButtonHTMLAttributes, PropsWithChildren } from 'react'

export const PrimaryButton: FC<PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>> = ({
  children,
  className,
  ...attrs
}) => (
  <button
    {...attrs}
    className={`${
      className ?? ''
    } text-white bg-primary-color w-full py-[14px] rounded-2xl font-medium text-base leading-0 box-content disabled:opacity-50`}
  >
    {children}
  </button>
)
