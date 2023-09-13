import BigNumber from 'bignumber.js'                                                        

export const localeNumberString = (value: BigNumber | string | number): string => {
  if (!value) return '0'
  const origin = typeof value === 'string' || typeof value === 'number' ? new BigNumber(value) : value
  const bigValue = origin.abs()
  if (bigValue.isNaN()) {
    return '0'
  }
  if (bigValue.isLessThan(1) && bigValue.abs().isGreaterThan(0)) {
    return `${value}`
  }
  let text = bigValue.toString(10)
  const pointIndex = text.indexOf('.')
  let offset = pointIndex === -1 ? text.length : pointIndex
  while (offset > 3) {
    text = text
      .slice(0, offset - 3)
      .concat(',')
      .concat(text.slice(offset - 3))
    offset -= 3
  }
  return origin.isNegative() ? `-${text}` : text
}

export const parseUDTAmount = (amount: string, decimal: string) => {
  try {
    const decimalInt = parseInt(decimal, 10)
    const amountBigInt = new BigNumber(amount)
    const result = amountBigInt.dividedBy(new BigNumber(10).pow(decimalInt))
    if (decimalInt > 20) {
      return `${result.toFixed(20)}...`
    }
    if (result.toString().length >= 16 || result.lt(new BigNumber(0.000001))) {
      return localeNumberString(result.toFixed(decimalInt))
    }
    return localeNumberString(result.toNumber())
  } catch (error) {
    console.error(error)
    return '0'
  }
}
