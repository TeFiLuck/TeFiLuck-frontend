import { useConnectedWallet } from './useConnectedWallet';

export function useAddress(): string {
  const { connectedWallet } = useConnectedWallet();
  return connectedWallet?.terraAddress || '';
}
