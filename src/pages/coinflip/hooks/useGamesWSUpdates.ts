import { GamesDisplayMode } from '@/constants/coinflip';
import { useAddress, useBalances } from '@/hooks';
import { useGames } from '@/hooks/coinflip';
import { CoinflipEventBus, CoinflipEvents } from '@/logic/events';
import { useAppDispatch, useAppSelector } from '@/state';
import { printInfo } from '@/state/app';
import { removeGame, replaceGame, updateGames } from '@/state/coinflip';
import { Game, HistoricalGame, OngoingGame } from '@/typings/coinflip';
import { isAddressInvolvedInGame, isGameCompletedByAnotherAddress, isGamesModePaginatable } from '@/utils/coinflip';
import { useEffect } from 'react';

export function useGamesWSUpdates() {
  const dispatch = useAppDispatch();
  const { games, gamesDisplayMode, isGameCreatedByUser, isUserInvolvedInGame } = useGames();
  const { paginationStep, paginationLimit } = useAppSelector((state) => state.coinflip);
  const userWalletAddress = useAddress();
  const { updateBalances } = useBalances();

  const maxAllowedGames = ((): number => {
    if (!isGamesModePaginatable(gamesDisplayMode)) return Infinity;
    return (paginationStep + 1) * paginationLimit;
  })();

  useEffect(() => {
    CoinflipEventBus.subscribe(CoinflipEvents.GAME_CREATED, handleGameCreation);
    CoinflipEventBus.subscribe(CoinflipEvents.GAME_CANCELED, handleGameCancellation);
    CoinflipEventBus.subscribe(CoinflipEvents.GAME_ACCEPTED, handleGameAccept);
    CoinflipEventBus.subscribe(CoinflipEvents.GAME_RESOLVED, handleGameCompletion);
    CoinflipEventBus.subscribe(CoinflipEvents.GAME_LIQUIDATED, handleGameCompletion);

    return () => {
      CoinflipEventBus.unsubscribe(CoinflipEvents.GAME_CREATED, handleGameCreation);
      CoinflipEventBus.unsubscribe(CoinflipEvents.GAME_CANCELED, handleGameCancellation);
      CoinflipEventBus.unsubscribe(CoinflipEvents.GAME_ACCEPTED, handleGameAccept);
      CoinflipEventBus.unsubscribe(CoinflipEvents.GAME_RESOLVED, handleGameCompletion);
      CoinflipEventBus.unsubscribe(CoinflipEvents.GAME_LIQUIDATED, handleGameCompletion);
    };
  });

  function handleGameCompletion({ game }: { game: HistoricalGame }): void {
    if (isAddressInvolvedInGame(game, userWalletAddress) && isGameCompletedByAnotherAddress(game, userWalletAddress)) {
      notifyGameCompleted(game);
      updateBalances();
    }

    if (gamesDisplayMode === GamesDisplayMode.My || gamesDisplayMode === GamesDisplayMode.PublicLiquidation) {
      dispatch(
        removeGame({
          mode: gamesDisplayMode,
          gameId: game.id,
        }),
      );
    }

    if (gamesDisplayMode === GamesDisplayMode.RecentHistory && isUserInvolvedInGame(game)) {
      dispatch(
        updateGames({
          mode: gamesDisplayMode,
          games: [game],
        }),
      );
    }
  }

  function handleGameAccept({ game }: { game: OngoingGame }): void {
    if (isGameCreatedByUser(game)) {
      notifyGameAccepted(game);
    }

    if (gamesDisplayMode === GamesDisplayMode.Open) {
      dispatch(
        removeGame({
          mode: gamesDisplayMode,
          gameId: game.id,
        }),
      );
    }

    if (gamesDisplayMode === GamesDisplayMode.My && isUserInvolvedInGame(game)) {
      const isGameExists = !!games.find((gameItem) => gameItem.id === game.id);
      if (isGameExists) {
        dispatch(
          replaceGame({
            mode: gamesDisplayMode,
            game,
          }),
        );
      } else {
        dispatch(
          updateGames({
            mode: gamesDisplayMode,
            games: [game],
          }),
        );
      }
    }
  }

  function handleGameCancellation({ gameId }: { gameId: string }): void {
    if (gamesDisplayMode === GamesDisplayMode.My || gamesDisplayMode === GamesDisplayMode.Open) {
      dispatch(
        removeGame({
          mode: gamesDisplayMode,
          gameId,
        }),
      );
    }
  }

  function handleGameCreation({ game }: { game: Game }): void {
    if (canInsertCreatedGame(game)) {
      dispatch(
        updateGames({
          mode: gamesDisplayMode,
          games: [game],
        }),
      );
    }
  }

  function canInsertCreatedGame(game: Game): boolean {
    if (
      gamesDisplayMode === GamesDisplayMode.My &&
      !isGamesModePaginatable(gamesDisplayMode) &&
      isUserInvolvedInGame(game)
    ) {
      return true;
    }

    if (gamesDisplayMode !== GamesDisplayMode.Open) return false;

    if (isGameCreatedByUser(game)) return false;

    return games.length < maxAllowedGames;
  }

  function notifyGameAccepted(game: OngoingGame): void {
    dispatch(
      printInfo({
        title: 'Game accepted',
        description: 'One of your games has just been accepted',
      }),
    );
  }

  function notifyGameCompleted(game: HistoricalGame): void {
    dispatch(
      printInfo({
        title: 'Game completed',
        description: 'One of your games has just been completed',
      }),
    );
  }
}
