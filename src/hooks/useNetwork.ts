import { DEFAULT_NETWORK_KEY, NetworkKey } from '@/constants/networks';
import { useWallet } from '@terra-money/wallet-provider';

export function useNetwork() {
  const { network } = useWallet();

  const networkKey = (network.name || DEFAULT_NETWORK_KEY) as NetworkKey;

  return { networkKey };
}
