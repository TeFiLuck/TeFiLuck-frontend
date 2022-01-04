import { NetworkKey } from '@/constants/networks';
import { Account } from '@terra-money/terra.js';
import { makeLCDClient } from '../utils';

export interface FetchAccountInfoParams {
  networkKey: NetworkKey;
  address: string;
  maxRetries?: number;
}

export async function fetchAccountInfo({
  networkKey,
  address,
  maxRetries = 0,
}: FetchAccountInfoParams): Promise<Account> {
  let retries = 0;
  const client = makeLCDClient(networkKey);

  const loadAccountInfo = (): Promise<Account> => {
    try {
      return client.auth.accountInfo(address);
    } catch (err) {
      if (retries < maxRetries) {
        retries += 1;
        return loadAccountInfo();
      } else {
        throw err;
      }
    }
  };

  return loadAccountInfo();
}
