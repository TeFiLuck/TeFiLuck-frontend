import { GamesDisplayMode, GamesSortingMethod } from '@/constants/coinflip';
import { TokenSymbol } from '@/constants/tokens';
import { BetSizesRange, Game, OngoingGame, SavedPasswordRecord } from '@/typings/coinflip';
import { createAction } from '@reduxjs/toolkit';

export const setGamesDisplayMode = createAction<GamesDisplayMode>('coinflip/setGamesDisplayMode');
export const setDisplayGamesTokensSymbols = createAction<TokenSymbol[]>('coinflip/setDisplayGamesTokensSymbols');
export const setBetsSizesRanges = createAction<BetSizesRange<number>[]>('coinflip/setBetsSizesRanges');
export const setSortingMethod = createAction<GamesSortingMethod>('coinflip/setSortingMethod');
export const setPaginationLimit = createAction<number>('coinflip/setPaginationLimit');
export const resetPaginationStep = createAction('coinflip/resetPaginationStep');
export const increasePaginationStep = createAction('coinflip/increasePaginationStep');
export const setIsCreateGameModalOpened = createAction<boolean>('coinflip/setIsCreateGameModalOpened');
export const setIsResolveGameModalOpened = createAction<boolean>('coinflip/setIsResolveGameModalOpened');
export const setResolveModalGame = createAction<OngoingGame>('coinflip/setResolveModalGame');
export const setResolveTimeLimitRange = createAction<[number, number]>('coinflip/setResolveTimeLimitRange');
export const setIsGameFlowAlertVisible = createAction<boolean>('coinflip/setIsGameFlowAlertVisible');
export const savePassword = createAction<SavedPasswordRecord>('coinflip/savePassword');
export const removePassword = createAction<string>('coinflip/removePassword');
export const setIsGamesLoading = createAction<boolean>('coinflip/setIsGamesLoading');
export const setCanLoadMoreGames = createAction<boolean>('coinflip/setCanLoadMoreGames');
export const resetGames = createAction('coinflip/resetGames');
export const updateGames = createAction<{
  mode: GamesDisplayMode;
  games:(Game | null)[];
  fresh?: boolean;
}>('coinflip/updateGames');
export const removeGame = createAction<{ mode: GamesDisplayMode; gameId: string }>('coinflip/removeGame');
