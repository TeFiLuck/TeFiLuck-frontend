import { GamesDisplayMode } from '@/constants/coinflip';
import { useAddress, useNetwork } from '@/hooks';
import { useAppDispatch, useAppSelector } from '@/state';
import {
  loadGames as loadGamesAction,
  LoadGamesPayload,
  setIsResolveGameModalOpened,
  setResolveModalGame,
} from '@/state/coinflip';
import { Game, OngoingGame } from '@/typings/coinflip';
import { Partial } from '@/typings/general';
import {
  isGameAcceptedByAddress,
  isGameCreatedByAddress,
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
    savedPasswords,
  } = useAppSelector((state) => state.coinflip);
  const { networkKey } = useNetwork();
  const userWalletAddress = useAddress();

  const gamesWithBlanks = allGames[gamesDisplayMode];
  const games = gamesWithBlanks.filter((game) => !!game) as Game[];

  const myGames = allGames[GamesDisplayMode.My].filter((game) => !!game) as Game[];
  const ongoingGames = myGames.filter((game) => 'responder' in game) as OngoingGame[];
  const unresolvedGames = ongoingGames.filter((game) => isGameCreatedByAddress(game, userWalletAddress));
  const hasUnresolvedGames = !!unresolvedGames.length;

  function isOngoingGame(game: Game): game is OngoingGame {
    return ongoingGames.findIndex((item) => item.id === game.id) > -1;
  }

  function isGameCreatedByUser(game: Game): boolean {
    return isGameCreatedByAddress(game, userWalletAddress);
  }

  function isGameAcceptedByUser(game: Game): boolean {
    return isGameAcceptedByAddress(game, userWalletAddress);
  }

  const isGamesEmpty = !games.length;
  const isFreshGamesLoading = isGamesLoading && isGamesEmpty;
  const isMoreGamesLoading = isGamesLoading && !isGamesEmpty;

  const isGamesFiltersEnabled = !isGamesLoading && isGamesDisplayModeFiltersEnabled(gamesDisplayMode);
  const isGamesDisplayModeSelectionEnabled = !isGamesLoading;
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

  function resolveGame(game: OngoingGame): void {
    dispatch(setResolveModalGame({ ...game }));
    dispatch(setIsResolveGameModalOpened(true));
  }

  function findSavedPassword(gameId: string): string | null {
    const record = savedPasswords.find(
      (recordItem) => recordItem.gameId === gameId && recordItem.address === userWalletAddress,
    );
    return record?.password || null;
  }

  return {
    gamesDisplayMode,
    gamesWithBlanks,
    games,
    myGames,
    unresolvedGames,
    hasUnresolvedGames,
    isOngoingGame,
    isGameCreatedByUser,
    isGameAcceptedByUser,
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
    resolveGame,
    findSavedPassword,
  };
}
