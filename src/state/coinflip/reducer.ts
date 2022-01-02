import {
  DEFAULT_GAMES_PAGINATION_LIMIT,
  DEFAULT_GAMES_SORTING_METHOD,
  GamesDisplayMode,
  GamesSortingMethod,
  MAX_BLOCKS_BEFORE_LIQUIDABLE,
  MIN_BLOCKS_BEFORE_LIQUIDABLE,
  MIN_GAMES_GHOSTS_DISPLAY,
} from '@/constants/coinflip';
import { DEFAULT_MAIN_TOKEN_SYMBOL, SUPPORTED_TOKENS } from '@/constants/finance-management';
import { TokenSymbol } from '@/constants/tokens';
import { BetSizesRange, Game, OngoingGame, SavedPasswordRecord } from '@/typings/coinflip';
import { createFreshBetSizesRangeBySymbol, isGamesDisplayModeAllowsGapGhosts } from '@/utils/coinflip';
import { numberToArray } from '@/utils/common';
import { createReducer } from '@reduxjs/toolkit';
import {
  increasePaginationStep,
  removeGame,
  removePassword,
  replaceGame,
  resetGames,
  resetPaginationStep,
  savePassword,
  setBetsSizesRanges,
  setCanLoadMoreGames,
  setDisplayGamesTokensSymbols,
  setGamesDisplayMode,
  setIsCreateGameModalOpened,
  setIsGameFlowAlertVisible,
  setIsGamesLoading,
  setIsResolveGameModalOpened,
  setPaginationLimit,
  setResolveModalGame,
  setResolveTimeLimitRange,
  setSortingMethod,
  updateGames,
} from './actions';
import { generateInitialGamesState } from './utils';

export interface CoinflipState {
  gamesDisplayMode: GamesDisplayMode;
  displayGamesTokensSymbols: TokenSymbol[];
  betsSizesRanges: BetSizesRange<number>[];
  sortingMethod: GamesSortingMethod;
  paginationLimit: number;
  paginationStep: number;
  resolveTimeLimitRange: [number, number];
  isGameFlowAlertVisible: boolean;
  savedPasswords: SavedPasswordRecord[];

  isCreateGameModalOpened: boolean;
  isResolveGameModalOpened: boolean;
  resolveModalGame: OngoingGame;

  isGamesLoading: boolean;
  canLoadMoreGames: boolean;
  games: Record<GamesDisplayMode, (Game | null)[]>;
}

export const initialState: CoinflipState = {
  gamesDisplayMode: GamesDisplayMode.Open,
  displayGamesTokensSymbols: [...SUPPORTED_TOKENS],
  betsSizesRanges: [createFreshBetSizesRangeBySymbol(DEFAULT_MAIN_TOKEN_SYMBOL)],
  sortingMethod: DEFAULT_GAMES_SORTING_METHOD,
  paginationLimit: DEFAULT_GAMES_PAGINATION_LIMIT,
  paginationStep: 0,
  resolveTimeLimitRange: [MIN_BLOCKS_BEFORE_LIQUIDABLE, MAX_BLOCKS_BEFORE_LIQUIDABLE],
  isGameFlowAlertVisible: true,
  savedPasswords: [],

  isCreateGameModalOpened: false,
  isResolveGameModalOpened: false,
  resolveModalGame: {} as OngoingGame,

  isGamesLoading: true,
  canLoadMoreGames: false,
  games: generateInitialGamesState(),
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(setGamesDisplayMode, (state, { payload }) => {
      state.gamesDisplayMode = payload;
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
    .addCase(setPaginationLimit, (state, { payload }) => {
      state.paginationLimit = payload;
    })
    .addCase(resetPaginationStep, (state) => {
      state.paginationStep = 0;
    })
    .addCase(increasePaginationStep, (state) => {
      state.paginationStep += 1;
    })
    .addCase(setResolveTimeLimitRange, (state, { payload }) => {
      state.resolveTimeLimitRange = payload;
    })
    .addCase(setIsCreateGameModalOpened, (state, { payload }) => {
      state.isCreateGameModalOpened = payload;
    })
    .addCase(setIsResolveGameModalOpened, (state, { payload }) => {
      state.isResolveGameModalOpened = payload;
    })
    .addCase(setResolveModalGame, (state, { payload }) => {
      state.resolveModalGame = payload;
    })
    .addCase(setIsGameFlowAlertVisible, (state, { payload }) => {
      state.isGameFlowAlertVisible = payload;
    })
    .addCase(savePassword, (state, { payload }) => {
      const existingRecordIdx = state.savedPasswords.findIndex((record) => record.gameId === payload.gameId);
      if (existingRecordIdx >= 0) {
        state.savedPasswords.splice(existingRecordIdx, 1, payload);
      } else {
        state.savedPasswords.push(payload);
      }
    })
    .addCase(removePassword, (state, { payload: gameId }) => {
      const existingRecordIdx = state.savedPasswords.findIndex((record) => record.gameId === gameId);
      if (existingRecordIdx >= 0) {
        state.savedPasswords.splice(existingRecordIdx, 1);
      }
    })
    .addCase(setIsGamesLoading, (state, { payload }) => {
      state.isGamesLoading = payload;
    })
    .addCase(setCanLoadMoreGames, (state, { payload }) => {
      state.canLoadMoreGames = payload;
    })
    .addCase(resetGames, (state) => {
      state.games = generateInitialGamesState();
    })
    .addCase(updateGames, (state, { payload }) => {
      const { mode, games, fresh } = payload;

      let gamesToInsert: Game[] = [];

      if (fresh) {
        gamesToInsert = games.filter((game) => !!game) as Game[];
      } else {
        const existingGames = state.games[mode].filter((game) => !!game) as Game[];
        const existingGamesIds = existingGames.map((game) => game.id);
        const newUniqueGames = games.filter((game) => game && !existingGamesIds.includes(game.id));
        gamesToInsert = newUniqueGames as Game[];
      }

      gamesToInsert.forEach((game) => {
        const nearestEmptyPositionIdx = state.games[mode].indexOf(null);
        if (nearestEmptyPositionIdx < 0) {
          // No ghosts, just add item at the tail
          state.games[mode].push(game);
        } else {
          // Fill nearest ghost
          state.games[mode].splice(nearestEmptyPositionIdx, 1, game);
        }
      });
    })
    .addCase(removeGame, (state, { payload }) => {
      const { mode, gameId } = payload;

      const games = state.games[mode];
      const removeGameIdx = games.findIndex((game) => game && game.id === gameId);

      const isPositionReservedByGhost = (idx: number) => idx <= MIN_GAMES_GHOSTS_DISPLAY - 1;

      if (removeGameIdx >= 0) {
        const isGamesAfterExist = games.length - 1 !== removeGameIdx && !!games[games.length - 1];

        if (!isGamesDisplayModeAllowsGapGhosts(mode)) {
          // Remove ghosts which are gaps: GAME-GHOST-GAME
          const gamesWithNoGaps = games.filter((game, index) => index !== removeGameIdx && game);
          const possiblyNecessaryGaps = numberToArray(MIN_GAMES_GHOSTS_DISPLAY).map(() => null);
          state.games[mode] = [...gamesWithNoGaps, ...possiblyNecessaryGaps].filter(
            (game, index) => game || isPositionReservedByGhost(index),
          );
        } else if (isGamesAfterExist || isPositionReservedByGhost(removeGameIdx)) {
          // Remove game and replace it with ghost.
          state.games[mode].splice(removeGameIdx, 1, null);
        } else {
          // Remove game, and remove all outdated ghosts if they exist
          state.games[mode] = games.filter((game, index) => {
            return index < removeGameIdx && (game || isPositionReservedByGhost(index));
          });
        }
      }
    })
    .addCase(replaceGame, (state, { payload }) => {
      const { mode, game } = payload;
      const games = state.games[mode];
      const replaceGameIdx = games.findIndex((gameItem) => gameItem && gameItem.id === game.id);

      if (replaceGameIdx >= 0) {
        state.games[mode].splice(replaceGameIdx, 1, game);
      }
    }),
);
