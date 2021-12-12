import { Network } from '@/typings/finance-management';
import { getKeyByNetwork, getNetworkByKey } from '@/utils/networks';
import { useWallet } from '@terra-money/wallet-provider';

export function useNetwork() {
  const { network } = useWallet();

  const networkKey = getKeyByNetwork(network as Network);

  return {
    network: getNetworkByKey(networkKey),
    networkKey,
  };
}
