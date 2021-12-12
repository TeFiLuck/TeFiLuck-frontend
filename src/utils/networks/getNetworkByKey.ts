import { NetworkKey, Networks } from '@/constants/networks';
import { Network } from '@/typings/finance-management';

export function getNetworkByKey(key: NetworkKey): Network {
  return Networks[key];
}
