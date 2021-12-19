import { GamesDisplayMode, GamesSortingMethod } from '@/constants/coinflip';
import { TokenSymbol } from '@/constants/tokens';
import { BetSizesRange, SavedPasswordRecord } from '@/typings/coinflip';
import { createAction } from '@reduxjs/toolkit';

export const setGamesDisplayMode = createAction<GamesDisplayMode>('coinflip/setGamesDisplayMode');
export const setDisplayGamesTokensSymbols = createAction<TokenSymbol[]>('coinflip/setDisplayGamesTokensSymbols');
export const setBetsSizesRanges = createAction<BetSizesRange<number>[]>('coinflip/setBetsSizesRanges');
export const setSortingMethod = createAction<GamesSortingMethod>('coinflip/setSortingMethod');
export const setPaginationSize = createAction<number>('coinflip/setPaginationSize');
export const setIsCreateGameModalOpened = createAction<boolean>('coinflip/setIsCreateGameModalOpened');
export const setResolveTimeLimitRange = createAction<[number, number]>('coinflip/setResolveTimeLimitRange');
export const setIsGameFlowAlertVisible = createAction<boolean>('coinflip/setIsGameFlowAlertVisible');
export const savePassword = createAction<SavedPasswordRecord>('coinflip/savePassword');
export const removePassword = createAction<string>('coinflip/removePassword');
