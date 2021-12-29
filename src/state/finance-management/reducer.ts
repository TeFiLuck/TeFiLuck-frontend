import { DEFAULT_MAIN_TOKEN_SYMBOL } from '@/constants/finance-management';
import { TokenSymbol } from '@/constants/tokens';
import { TokensBalances, TransactionConfig, TxResult } from '@/typings/finance-management';
import { createReducer } from '@reduxjs/toolkit';
import {
  resetBalances,
  setBalances,
  setBalancesLoading,
  setIsTransactionModalOpened,
  setMainTokenSymbol,
  setTransactionConfig,
  updateBalances,
} from './actions';
import { generateInitialBalancesState } from './utils';

export interface FinanceManagementState {
  balances: TokensBalances;
  isBalancesLoading: boolean;
  balancesUpdateCounter: number;
  mainTokenSymbol: TokenSymbol;
  isTransactionModalOpened: boolean;
  transactionConfig: TransactionConfig;
}

export const initialState: FinanceManagementState = {
  balances: generateInitialBalancesState(),
  isBalancesLoading: false,
  balancesUpdateCounter: 0,
  mainTokenSymbol: DEFAULT_MAIN_TOKEN_SYMBOL,
  isTransactionModalOpened: false,
  transactionConfig: {
    title: '',
    executionAction: new Promise(() => {}) as Promise<TxResult>,
  },
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
    })
    .addCase(setIsTransactionModalOpened, (state, { payload }) => {
      state.isTransactionModalOpened = payload;
    })
    .addCase(setTransactionConfig, (state, { payload }) => {
      state.transactionConfig = payload;
    }),
);
