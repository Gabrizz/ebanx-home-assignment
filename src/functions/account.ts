import { getAccountById } from '../db';

import { notFoundError } from './shared';

export function fetchAmountByAccountId(account_id: string) {
  const account = getAccountById(account_id);
  if (account) {
    return account.amount
  }
  throw notFoundError('Account');
};