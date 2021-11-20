import { TokenSymbol } from '@/constants/tokens';
import { TokensBalances } from '@/typings/finance-management';
import { createAction } from '@reduxjs/toolkit';

export const setBalances = createAction<TokensBalances>('financeManagement/setBalances');
export const resetBalances = createAction('financeManagement/resetBalances');
export const setBalancesLoading = createAction<boolean>('financeManagement/setBalancesLoading');
export const updateBalances = createAction('financeManagement/updateBalances');

export const setMainTokenSymbol = createAction<TokenSymbol>('financeManagement/setMainTokenSymbol');
