import { DEFAULT_GAMES_PAGINATION_SIZE, DEFAULT_GAMES_SORTING_METHOD, GamesSortingMethod } from '@/constants/coinflip';
import { DEFAULT_MAIN_TOKEN_SYMBOL } from '@/constants/finance-management';
import { TokenSymbol } from '@/constants/tokens';
import { BetSizesRange } from '@/typings/coinflip';
import { createFreshBetSizesRangeBySymbol } from '@/utils/coinflip';
import { createReducer } from '@reduxjs/toolkit';
import {
  setBetsSizesRanges,
  setDisplayGamesTokensSymbols,
  setIsOnlyMyGamesDisplayed,
  setPaginationSize,
  setSortingMethod,
} from './actions';

export interface CoinflipState {
  isOnlyMyGamesDisplayed: boolean;
  displayGamesTokensSymbols: TokenSymbol[];
  betsSizesRanges: BetSizesRange<number>[];
  sortingMethod: GamesSortingMethod;
  paginationSize: number;
}

export const initialState: CoinflipState = {
  isOnlyMyGamesDisplayed: false,
  displayGamesTokensSymbols: [DEFAULT_MAIN_TOKEN_SYMBOL],
  betsSizesRanges: [createFreshBetSizesRangeBySymbol(DEFAULT_MAIN_TOKEN_SYMBOL)],
  sortingMethod: DEFAULT_GAMES_SORTING_METHOD,
  paginationSize: DEFAULT_GAMES_PAGINATION_SIZE,
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(setIsOnlyMyGamesDisplayed, (state, { payload }) => {
      state.isOnlyMyGamesDisplayed = payload;
    })
    .addCase(setDisplayGamesTokensSymbols, (state, { payload }) => {
      state.displayGamesTokensSymbols = payload;
    })
    .addCase(setBetsSizesRanges, (state, { payload }) => {
      state.betsSizesRanges = payload;
    })
    .addCase(setSortingMethod, (state, { payload }) => {
      state.sortingMethod = payload;
    })
    .addCase(setPaginationSize, (state, { payload }) => {
      state.paginationSize = payload;
    }),
);
