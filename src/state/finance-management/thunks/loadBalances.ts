import { TerraAPI } from '@/api/terra';
import { NetworkKey } from '@/constants/networks';
import { AppState } from '@/state';
import { printError } from '@/state/app';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setBalances, setBalancesLoading } from '../actions';

type LoadBalancesPayload = {
  networkKey: NetworkKey;
  address: string;
};
export const loadBalances = createAsyncThunk(
  'financeManagement/loadBalances',
  async ({ networkKey, address }: LoadBalancesPayload, { dispatch, getState }) => {
    try {
      dispatch(setBalancesLoading(true));

      const nativeBalances = await TerraAPI.core.fetchNativeTokensBalancesFromAddress(networkKey, address);
      const { financeManagement } = getState() as AppState;

      dispatch(
        setBalances({
          ...financeManagement.balances,
          ...nativeBalances,
        }),
      );
    } catch (e: any) {
      dispatch(
        printError({
          title: 'Failed to fetch balances',
          description: 'There might be some network issue, try reload the page and check your Internet connection.',
        }),
      );
    } finally {
      dispatch(setBalancesLoading(false));
    }
  },
);
