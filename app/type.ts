export type TransactionNormalCell = {
  cellType: "normal";
  addressHash: string;
  capacity: string;
};

export type UdtInfo = {
  amount: string;
  decimal: string;
  symbol: string;
};

export type TransactionUdtCell = {
  cellType: "udt";
  addressHash: string;
  capacity: string;
  extraInfo: UdtInfo;
};

export type TransactionCell = TransactionNormalCell | TransactionUdtCell;

export interface Transaction {
  type: "from" | "to" | "mint"; // for mock, todo: after migrate to api, the type is calculated based on the inputs and outputs
  txHash: string;
  blockTimestamp?: string;
  txStatus: "committed" | "pending" | "proposed";
  displayInputs: TransactionCell[];
  displayOutputs: TransactionCell[];
}

export const TYPE_LABEL_MAP = {
  from: "From",
  to: "To",
  mint: "Mint to",
};

export type Account = {
  address: string;
  balance: string;
}

