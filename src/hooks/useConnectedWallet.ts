import { useAppDispatch } from '@/state';
import { setIsTransactionModalOpened, setTransactionConfig } from '@/state/finance-management';
import { TransactionConfig } from '@/typings/finance-management';
import { useConnectedWallet as useConnectedTerraWallet, useWallet, WalletStatus } from '@terra-money/wallet-provider';

export function useConnectedWallet() {
  const dispatch = useAppDispatch();
  const { status } = useWallet();

  const connectedWallet = useConnectedTerraWallet();
  const isWalletConnected = !!connectedWallet;
  const isWalletInitializing = status === WalletStatus.INITIALIZING;

  function requestTransactionDispatch(transactionConfig: TransactionConfig): void {
    if (isWalletConnected) {
      dispatch(setTransactionConfig(transactionConfig));
      dispatch(setIsTransactionModalOpened(true));
    }
  }

  return { connectedWallet, isWalletConnected, isWalletInitializing, requestTransactionDispatch };
}
