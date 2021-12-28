import { GamesDisplayMode } from '@/constants/coinflip';
import { useAddress, useNetwork } from '@/hooks';
import { useAppDispatch, useAppSelector } from '@/state';
import { loadGames as loadGamesAction, LoadGamesPayload } from '@/state/coinflip';
import { Game } from '@/typings/coinflip';
import { Partial } from '@/typings/general';
import {
  isGamesDisplayModeFiltersEnabled,
  isGamesModePaginatable,
  isGamesModeSpecificFilterEnabled,
} from '@/utils/coinflip';

export function useGames() {
  const dispatch = useAppDispatch();
  const {
    gamesDisplayMode,
    isGamesLoading,
    games: allGames,
    canLoadMoreGames,
  } = useAppSelector((state) => state.coinflip);
  const { networkKey } = useNetwork();
  const userWalletAddress = useAddress();

  const gamesWithBlanks = allGames[gamesDisplayMode];
  const games = gamesWithBlanks.filter((game) => !!game) as Game[];

  const myGames = allGames[GamesDisplayMode.My].filter((game) => !!game) as Game[];
  const unresolvedGames = myGames.filter((game) => false);
  const hasUnresolvedGames = !!unresolvedGames.length;

  const isGamesEmpty = !games.length;
  const isFreshGamesLoading = isGamesLoading && isGamesEmpty;
  const isMoreGamesLoading = isGamesLoading && !isGamesEmpty;

  const isGamesFiltersEnabled =
    !isGamesLoading && !hasUnresolvedGames && isGamesDisplayModeFiltersEnabled(gamesDisplayMode);
  const isGamesDisplayModeSelectionEnabled = !isGamesLoading && !hasUnresolvedGames;
  const isCurrenciesFilterEnabled =
    isGamesFiltersEnabled && isGamesModeSpecificFilterEnabled(gamesDisplayMode, 'currencies');
  const isBetSizesFilterEnabled =
    isGamesFiltersEnabled && isGamesModeSpecificFilterEnabled(gamesDisplayMode, 'betSizes');
  const isPaginationFilterEnabled =
    isGamesFiltersEnabled && isGamesModeSpecificFilterEnabled(gamesDisplayMode, 'pagination');
  const isSortingFilterEnabled = isGamesFiltersEnabled && isGamesModeSpecificFilterEnabled(gamesDisplayMode, 'sorting');
  const isResolveTimeLimitFilterEnabled =
    isGamesFiltersEnabled && isGamesModeSpecificFilterEnabled(gamesDisplayMode, 'resolveTimeLimit');

  async function loadGames(params: Partial<LoadGamesPayload> = {}): Promise<void> {
    await dispatch(
      loadGamesAction({
        networkKey: params.networkKey || networkKey,
        userWalletAddress: params.userWalletAddress || userWalletAddress,
        fresh: params.fresh,
        isPreloadEnabled: params.isPreloadEnabled,
      }),
    );
  }

  return {
    gamesWithBlanks,
    games,
    myGames,
    unresolvedGames,
    hasUnresolvedGames,
    isGamesEmpty,
    isGamesLoading,
    isFreshGamesLoading,
    isMoreGamesLoading,
    isGamesFiltersEnabled,
    isGamesDisplayModeSelectionEnabled,
    isCurrenciesFilterEnabled,
    isBetSizesFilterEnabled,
    isPaginationFilterEnabled,
    isSortingFilterEnabled,
    isResolveTimeLimitFilterEnabled,
    canLoadMoreGames: canLoadMoreGames && isGamesModePaginatable(gamesDisplayMode),
    loadGames,
  };
}
