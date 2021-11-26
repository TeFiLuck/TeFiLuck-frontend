import { useConnectedWallet, useLCDClient } from '@/hooks';
import { useAppDispatch, useAppSelector } from '@/state';
import { useEffect } from 'react';
import { resetBalances } from './actions';
import { loadBalances } from './thunks';

export function useFinanceManagementStore(): void {
  const dispatch = useAppDispatch();
  const { balancesUpdateCounter } = useAppSelector((state) => state.financeManagement);
  const LCDCClient = useLCDClient();
  const { connectedWallet } = useConnectedWallet();

  useEffect(() => {
    if (connectedWallet && LCDCClient) {
      dispatch(
        loadBalances({
          client: LCDCClient,
          address: connectedWallet.walletAddress,
        }),
      );
    } else {
      dispatch(resetBalances());
    }
  }, [connectedWallet, LCDCClient, balancesUpdateCounter]);
}
