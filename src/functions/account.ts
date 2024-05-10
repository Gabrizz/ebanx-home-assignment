import accountsDict from '../db';

import { notFoundError } from './shared';

export function fetchAmountByAccountId(account_id: string) {
  if (account_id in accountsDict) {
    return accountsDict[account_id].amount
  }
  throw notFoundError('Account');
};