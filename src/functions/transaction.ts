import accountsDict from '../db';
import {
  depositResponse,
  transferResponse,
  withdrawResponse
} from '../types/transaction';

import { insufficientBalanceError, notFoundError } from './shared';

function deposit(amount: number, account_id: string) {
  if (account_id in accountsDict) {
    accountsDict[account_id].amount = accountsDict[account_id].amount + amount;
  } else {
    accountsDict[account_id] = { amount: amount };
  }
  const depositResponse: depositResponse = {
    destination: {
      id: account_id,
      balance: accountsDict[account_id].amount
    }
  }
  return depositResponse;
};
function withdraw(amount: number, account_id: string) {
  if (account_id in accountsDict) {
    if (amount <= accountsDict[account_id].amount) {
      accountsDict[account_id].amount -= amount;
      const withdrawResponse: withdrawResponse = {
        origin: {
          id: account_id,
          balance: accountsDict[account_id].amount
        }
      }
      return withdrawResponse;
    } else {
      throw insufficientBalanceError();
    }
  } else {
    throw notFoundError('Account');
  }
};
function transfer(amount: number, account_id: string, receiving_account_id: string) {
  const withdrawResponse = withdraw(amount, account_id);
  const depositResponse = deposit(amount, receiving_account_id);
  const transferResponse: transferResponse = {
    origin: withdrawResponse.origin,
    destination: depositResponse.destination
  }
  return transferResponse;
};

export function transaction(
  amount: number,
  account_id: string,
  type: 'deposit' | 'withdraw'
): depositResponse | withdrawResponse;

export function transaction(
  amount: number,
  account_id: string,
  type: 'transfer', 
  receiving_account_id: string
): transferResponse;

export function transaction(
  amount: number,
  account_id: string,
  type: 'deposit' | 'withdraw' | 'transfer',
  receiving_account_id?: string
): depositResponse | withdrawResponse | transferResponse {
  if (type === 'transfer' && receiving_account_id) {
    return transfer(amount, account_id, receiving_account_id);
  } else if (type === 'deposit') {
    return deposit(amount, account_id);
  } else {
    return withdraw(amount, account_id);
  }
};