import { useConnectedWallet as useConnectedTerraWallet } from '@terra-money/wallet-provider';

export function useConnectedWallet() {
  const connectedWallet = useConnectedTerraWallet();
  const isWalletConnected = !!connectedWallet;

  return { connectedWallet, isWalletConnected };
}
