import { useConnectedWallet as useConnectedTerraWallet, useWallet, WalletStatus } from '@terra-money/wallet-provider';

export function useConnectedWallet() {
  const { status } = useWallet();

  const connectedWallet = useConnectedTerraWallet();
  const isWalletConnected = !!connectedWallet;
  const isWalletInitializing = status === WalletStatus.INITIALIZING;

  return { connectedWallet, isWalletConnected, isWalletInitializing };
}
