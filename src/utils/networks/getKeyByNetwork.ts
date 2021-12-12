import { NetworkKey } from '@/constants/networks';
import { Network } from '@/typings/finance-management';

export function getKeyByNetwork(network: Network): NetworkKey {
  return network.chainID as NetworkKey;
}
