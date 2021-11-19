import { useConnectedWallet } from '@terra-money/wallet-provider';

export function useAddress(): string {
  const connectedWallet = useConnectedWallet();
  return connectedWallet?.terraAddress || '';
}
