import { useConnectedWallet, useNetwork } from '@/hooks';
import { useAppDispatch, useAppSelector } from '@/state';
import { useEffect } from 'react';
import { resetBalances } from './actions';
import { loadBalances } from './thunks';

export function useFinanceManagementStore(): void {
  const dispatch = useAppDispatch();
  const { balancesUpdateCounter } = useAppSelector((state) => state.financeManagement);
  const { connectedWallet } = useConnectedWallet();
  const { networkKey } = useNetwork();

  useEffect(() => {
    if (connectedWallet) {
      dispatch(
        loadBalances({
          networkKey,
          address: connectedWallet.walletAddress,
        }),
      );
    } else {
      dispatch(resetBalances());
    }
  }, [connectedWallet, balancesUpdateCounter]);
}
