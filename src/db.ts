import { account } from './types/account';

let accountsDict: { [key: string]: account } = {};

export function resetDatabase() {
  accountsDict = {};
}

export default accountsDict;