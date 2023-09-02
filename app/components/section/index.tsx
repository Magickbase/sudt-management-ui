import type { FC, ReactElement } from 'react'

export const MainSection: FC<{ children: ReactElement }> = ({ children }) => (
  <section className="w-[375px] h-[500px] bg-black border border-secondary-color rounded-2xl px-12 py-6">
    {children}
  </section>
)

export const SubSection: FC<{ children: ReactElement }> = ({ children }) => (
  <section className="w-[375px] bg-black border border-secondary-color rounded-2xl px-12 py-6 mb-6">{children}</section>
)
