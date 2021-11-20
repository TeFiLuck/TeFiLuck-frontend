import { DEFAULT_MAIN_TOKEN_SYMBOL } from '@/constants/finance-management';
import { TokenSymbol } from '@/constants/tokens';
import { TokensBalances } from '@/typings/finance-management';
import { createReducer } from '@reduxjs/toolkit';
import {
  resetBalances,
  setBalances,
  setBalancesLoading,
  setMainTokenSymbol,
  updateBalances,
} from './actions';
import { generateInitialBalancesState } from './utils';

export interface FinanceManagementState {
  balances: TokensBalances;
  isBalancesLoading: boolean;
  balancesUpdateCounter: number;
  mainTokenSymbol: TokenSymbol;
}

export const initialState: FinanceManagementState = {
  balances: generateInitialBalancesState(),
  isBalancesLoading: false,
  balancesUpdateCounter: 0,
  mainTokenSymbol: DEFAULT_MAIN_TOKEN_SYMBOL,
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(setBalances, (state, { payload }) => {
      state.balances = payload;
    })
    .addCase(resetBalances, (state) => {
      state.balances = generateInitialBalancesState();
    })
    .addCase(setBalancesLoading, (state, { payload }) => {
      state.isBalancesLoading = payload;
    })
    .addCase(updateBalances, (state) => {
      state.balancesUpdateCounter += 1;
    })
    .addCase(setMainTokenSymbol, (state, { payload }) => {
      state.mainTokenSymbol = payload;
    }),
);
