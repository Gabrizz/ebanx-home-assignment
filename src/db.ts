import { account } from './types/account';

let accountsDict: { [key: string]: account } = {};

export function resetDatabase() {
  const newAccountsDict: { [key: string]: account } = {};
  accountsDict = newAccountsDict;
}

export function getAccountsDict() {
  return accountsDict;
}

export function getAccountById(id: string) {
  if (id in accountsDict) {
    return accountsDict[id];
  }
  return undefined;
}

export function updateAccountById(id: string, account: account) {
  accountsDict[id] = account;
}