import BigNumber from 'bignumber.js'

export const parseAmount = (amount: string, decimal: string) => {
  try {
    const decimalInt = parseInt(decimal, 10)
    const amountBigInt = new BigNumber(amount)
    return amountBigInt.dividedBy(new BigNumber(10).pow(decimalInt))
  } catch (error) {
    console.error(error)
    return new BigNumber(0)
  }
}

export const formatAmount = (amount: string, decimal: string) => {
  const decimalInt = parseInt(decimal, 10)
  const amountBigNmber = parseAmount(amount, decimal)
  if (decimalInt > 20) {
    return `${amountBigNmber.toFixed(20)}...`
  }

  return amountBigNmber.toFormat()
}
