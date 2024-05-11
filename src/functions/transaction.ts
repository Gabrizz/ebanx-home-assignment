import { getAccountById, getAccountsDict, updateAccountById } from '../db';
import {
  depositResponse,
  transferResponse,
  withdrawResponse
} from '../types/transaction';

import { insufficientBalanceError, notFoundError } from './shared';

function deposit(amount: number, account_id: string) {
  const accountsDict = getAccountsDict();
  if (account_id in accountsDict) {
    const newAmount = accountsDict[account_id].amount + amount;
    updateAccountById(account_id, { amount: newAmount });
  } else {
    updateAccountById(account_id, { amount: amount });
  }
  const depositResponse: depositResponse = {
    destination: {
      id: account_id,
      balance: getAccountById(account_id)!.amount
    }
  }
  return depositResponse;
};
function withdraw(amount: number, account_id: string) {
  const accountsDict = getAccountsDict();
  if (account_id in accountsDict) {
    if (amount <= accountsDict[account_id].amount) {
      const newAmount = accountsDict[account_id].amount - amount;
      updateAccountById(account_id, { amount: newAmount });
      const withdrawResponse: withdrawResponse = {
        origin: {
          id: account_id,
          balance: newAmount
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
  type: 'deposit'
): depositResponse;

export function transaction(
  amount: number,
  account_id: string,
  type: 'withdraw'
): withdrawResponse;

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