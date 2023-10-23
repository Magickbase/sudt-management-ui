import type { FC, PropsWithChildren } from 'react'

export const MainSection: FC<PropsWithChildren> = ({ children }) => (
  <section className="w-[375px] min-h-[500px] bg-black border border-[#22223E] rounded-2xl p-6 shadow-lg shadow-[#0057ff33]">
    {children}
  </section>
)

export const SubSection: FC<PropsWithChildren> = ({ children }) => (
  <section className="w-[375px] bg-black border border-[#22223E] rounded-2xl px-6 py-4 mb-6">{children}</section>
)
