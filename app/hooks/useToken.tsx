'use client'
import { useState, useContext, createContext } from 'react'
import { Token } from '../type'

export interface ITokenContext {
  token: Token
}

export const TokenContext = createContext<ITokenContext | undefined>(undefined)

export const useToken = () => {
  const context = useContext(TokenContext)
  if (!context)
    throw new Error('No TokenContext.Provider found when calling useToken.')
  return context
}

export const TokenContextProvider = ({
  token,
  children,
}: React.PropsWithChildren<{ token: Token }>) => {
  return (
    <TokenContext.Provider
      value={{
        token,
      }}
    >
      {children}
    </TokenContext.Provider>
  )
}
