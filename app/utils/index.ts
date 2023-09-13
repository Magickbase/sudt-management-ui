import BigNumber from 'bignumber.js'

export const shannonToCkb = (value: BigNumber | string | number): string => {
  if (!value) return '0'
  const bigValue = typeof value === 'string' || typeof value === 'number' ? new BigNumber(value) : value
  if (bigValue.isNaN()) {
    return '0'
  }
  const num = bigValue.dividedBy(new BigNumber('1e8'))
  if (num.abs().isLessThan(new BigNumber('1e-8'))) {
    return '0'
  }
  if (num.abs().isLessThan(new BigNumber('1e-6'))) {
    if (bigValue.mod(10).isEqualTo(0)) {
      return num.toFixed(7)
    }
    return num.toFixed(8)
  }
  return `${num}`
}

export const shannonToCkbDecimal = (value: BigNumber | string | number, decimal?: number) => {
  if (!value) return 0
  const bigValue = typeof value === 'string' || typeof value === 'number' ? new BigNumber(value) : value
  if (bigValue.isNaN()) {
    return 0
  }
  const num = bigValue.dividedBy(new BigNumber('1e8')).abs().toNumber()
  if (decimal) {
    if (bigValue.isNegative()) {
      return 0 - Math.floor(num * 10 ** decimal) / 10 ** decimal
    }
    return Math.floor(num * 10 ** decimal) / 10 ** decimal
  }
  if (bigValue.isNegative()) {
    return 0 - Math.floor(num)
  }
  return Math.floor(num)
}