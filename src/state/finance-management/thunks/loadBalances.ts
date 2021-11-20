import { fetchNativeTokensBalancesFromAddress } from '@/api/terra';
import { AppState } from '@/state';
import { printError } from '@/state/app';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { LCDClient } from '@terra-money/terra.js';
import { setBalances, setBalancesLoading } from '../actions';

type LoadBalancesPayload = {
  client: LCDClient;
  address: string;
};
export const loadBalances = createAsyncThunk(
  'financeManagement/loadBalances',
  async ({ client, address }: LoadBalancesPayload, { dispatch, getState }) => {
    try {
      dispatch(setBalancesLoading(true));

      const nativeBalances = await fetchNativeTokensBalancesFromAddress(client, address);
      const { financeManagement } = getState() as AppState;

      dispatch(
        setBalances({
          ...financeManagement.balances,
          ...nativeBalances,
        }),
      );
    } catch (e: any) {
      printError({
        title: 'Failed to fetch balances',
        description:
          'There might be some network issue, try reload the browser and check your Internet connection.',
      });
    } finally {
      dispatch(setBalancesLoading(false));
    }
  },
);
