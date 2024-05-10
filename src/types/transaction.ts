// Transaction responses
interface TransactionResponseBase {
  id: string;
  balance: number;
}

export type depositResponse = {
  destination: TransactionResponseBase;
};

export type withdrawResponse = {
  origin: TransactionResponseBase;
};

export interface transferResponse extends withdrawResponse, depositResponse {}