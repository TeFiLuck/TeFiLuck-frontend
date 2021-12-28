import { AppAPI } from '@/api/app';
import { TerraAPI } from '@/api/terra';
import { GamesDisplayMode, SORTING_CONFIGURATIONS } from '@/constants/coinflip';
import { NetworkKey } from '@/constants/networks';
import { AppState } from '@/state';
import { printError } from '@/state/app';
import { Game } from '@/typings/coinflip';
import { getPreloadableGamesModes, isGamesModePaginatable } from '@/utils/coinflip';
import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import {
  increasePaginationStep,
  resetGames,
  resetPaginationStep,
  setCanLoadMoreGames,
  setIsGamesLoading,
  updateGames,
} from '../actions';

export type LoadGamesPayload = {
  networkKey: NetworkKey;
  userWalletAddress?: string;
  fresh?: boolean;
  isPreloadEnabled?: boolean;
};
export const loadGames = createAsyncThunk(
  'coinflip/loadGames',
  async (payload: LoadGamesPayload, { dispatch, getState }) => {
    dispatch(setIsGamesLoading(true));

    const { coinflip } = getState() as AppState;
    const { fresh, isPreloadEnabled } = payload;
    const currentGamesDisplayMode = coinflip.gamesDisplayMode;

    const loadGamesMethodsMap: Record<GamesDisplayMode, AsyncThunk<Game[], LoadGamesPayload, any>> = {
      [GamesDisplayMode.Open]: loadOpenGames,
      [GamesDisplayMode.My]: loadMyGames,
      [GamesDisplayMode.PublicLiquidation]: loadPublicLiquidationGames,
      [GamesDisplayMode.RecentHistory]: loadRecentHistoryGames,
    };

    const loadTargetedGames = loadGamesMethodsMap[currentGamesDisplayMode];
    const preloadableGamesModes = getPreloadableGamesModes().filter((mode) => mode !== currentGamesDisplayMode);

    try {
      if (fresh) {
        dispatch(resetGames());
        dispatch(resetPaginationStep());
      }

      const targetGamesPromise = dispatch(loadTargetedGames(payload)).unwrap();
      let preloadGamesPromises: Promise<Game[]>[] = [];

      if (isPreloadEnabled) {
        preloadGamesPromises = preloadableGamesModes.map((mode) => {
          const load = loadGamesMethodsMap[mode];
          return dispatch(load(payload)).unwrap();
        });
      }

      const [targetGames, ...preloadedGames] = await Promise.all([targetGamesPromise, ...preloadGamesPromises]);

      dispatch(
        updateGames({
          mode: currentGamesDisplayMode,
          games: targetGames,
          fresh,
        }),
      );

      if (isPreloadEnabled) {
        preloadableGamesModes.forEach((mode, modeIdx) => {
          dispatch(
            updateGames({
              mode,
              games: preloadedGames[modeIdx],
              fresh,
            }),
          );
        });
      }

      if (isGamesModePaginatable(currentGamesDisplayMode)) {
        dispatch(increasePaginationStep());
        dispatch(setCanLoadMoreGames(coinflip.paginationLimit === targetGames.length));
      }
    } catch (err) {
      dispatch(
        printError({
          title: 'Failed to load games',
          description: 'There might be some network issue, try reload the page and check your Internet connection.',
        }),
      );
    } finally {
      dispatch(setIsGamesLoading(false));
    }
  },
);

export const loadOpenGames = createAsyncThunk(
  'coinflip/loadOpenGames',
  async ({ networkKey, userWalletAddress }: LoadGamesPayload, { getState }): Promise<Game[]> => {
    const { coinflip } = getState() as AppState;

    const { bets } = await AppAPI.coinflip.fetchOpenGames({
      networkKey,
      skip: coinflip.paginationStep * coinflip.paginationLimit,
      limit: coinflip.paginationLimit,
      excludeAddress: userWalletAddress,
      assets: coinflip.betsSizesRanges.map((range) => ({
        denom: range.tokenSymbol,
        bet_size_from: TerraAPI.utils.toUAmount(range.min, range.tokenSymbol),
        bet_size_to: TerraAPI.utils.toUAmount(range.max, range.tokenSymbol),
      })),
      resolveTimeLimitFrom: coinflip.resolveTimeLimitRange[0],
      resolveTimeLimitTo: coinflip.resolveTimeLimitRange[1],
      sortBy: SORTING_CONFIGURATIONS[coinflip.sortingMethod],
    });

    return bets;
  },
);

export const loadMyGames = createAsyncThunk(
  'coinflip/loadMyGames',
  async ({ networkKey, userWalletAddress }: LoadGamesPayload): Promise<Game[]> => {
    if (!userWalletAddress) return [];

    const { pending, ongoing } = await AppAPI.coinflip.fetchMyGames({
      networkKey,
      address: userWalletAddress,
    });

    return [...ongoing, ...pending];
  },
);

export const loadPublicLiquidationGames = createAsyncThunk(
  'coinflip/loadPublicLiquidationGames',
  async ({ networkKey }: LoadGamesPayload, { getState }): Promise<Game[]> => {
    const { coinflip } = getState() as AppState;

    const response = await AppAPI.coinflip.fetchPublicLiquidationGames({
      networkKey,
      skip: coinflip.paginationStep * coinflip.paginationLimit,
      limit: coinflip.paginationLimit,
    });

    return response;
  },
);

export const loadRecentHistoryGames = createAsyncThunk(
  'coinflip/loadRecentHistoryGames',
  async ({ networkKey, userWalletAddress }: LoadGamesPayload, { getState }): Promise<Game[]> => {
    if (!userWalletAddress) return [];

    const { coinflip } = getState() as AppState;

    const { history } = await AppAPI.coinflip.fetchRecentHistoryGames({
      networkKey,
      address: userWalletAddress,
      skip: coinflip.paginationStep * coinflip.paginationLimit,
      limit: coinflip.paginationLimit,
    });

    return history;
  },
);
