import BigNumber from "bignumber.js";

export const parseAmount = (amount: string, decimal: string) => {
  try {
    const decimalInt = parseInt(decimal, 10);
    const amountBigInt = new BigNumber(amount);
    const result = amountBigInt.dividedBy(new BigNumber(10).pow(decimalInt))
    if (decimalInt > 20) {
      return `${result.toFixed(20)}...`
    }

    return result.toFormat(decimalInt)
  } catch (error) {
    console.error(error);
    return "0";
  }
};
