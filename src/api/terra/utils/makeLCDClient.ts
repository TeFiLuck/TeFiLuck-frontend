import { NetworkKey } from '@/constants/networks';
import { getNetworkByKey } from '@/utils/networks';
import { LCDClient } from '@terra-money/terra.js';

export function makeLCDClient(networkKey: NetworkKey): LCDClient {
  const network = getNetworkByKey(networkKey);

  return new LCDClient({
    URL: network.lcd,
    chainID: network.chainID,
  });
}
