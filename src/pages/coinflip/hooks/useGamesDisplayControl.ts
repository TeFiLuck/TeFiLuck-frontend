import { GamesDisplayMode } from '@/constants/coinflip';
import { INITIAL_WALLET_LOADING_DELAY_MS } from '@/constants/networks';
import { useConnectedWallet } from '@/hooks';
import { useGames } from '@/hooks/coinflip';
import { useAppDispatch, useAppSelector } from '@/state';
import { setGamesDisplayMode } from '@/state/coinflip';
import { isGamesDisplayModePrivate } from '@/utils/coinflip';
import { useEffect, useState } from 'react';

export function useGamesDisplayControl() {
  const dispatch = useAppDispatch();
  const { isGamesLoading, gamesDisplayMode, betsSizesRanges, resolveTimeLimitRange, sortingMethod, paginationLimit } =
    useAppSelector((state) => state.coinflip);
  const { isWalletConnected, isWalletInitializing } = useConnectedWallet();
  const { loadGames, hasUnresolvedGames } = useGames();

  const [isGamesInitiallyFetched, setIsGamesInitiallyFetched] = useState(false);
  const [isInitialWalletLoadingDelayPassed, setIsInitialWalletLoadingDelayPassed] = useState(false);

  useEffect(() => {
    if (!isWalletInitializing) {
      loadGames({ fresh: true, isPreloadEnabled: true });
      setIsGamesInitiallyFetched(true);
      setTimeout(() => setIsInitialWalletLoadingDelayPassed(true), INITIAL_WALLET_LOADING_DELAY_MS);
    }
  }, [isWalletInitializing]);

  useEffect(() => {
    if (isGamesInitiallyFetched) {
      if (!isWalletConnected && isGamesDisplayModePrivate(gamesDisplayMode)) {
        dispatch(setGamesDisplayMode(GamesDisplayMode.Open));
      }

      if (isInitialWalletLoadingDelayPassed) {
        loadGames({ fresh: true, isPreloadEnabled: true });
      }
    }
  }, [isGamesInitiallyFetched, isWalletConnected]);

  useEffect(() => {
    if (isGamesInitiallyFetched && !isGamesLoading) {
      loadGames({ fresh: true });
    }
  }, [betsSizesRanges, resolveTimeLimitRange, sortingMethod, paginationLimit, gamesDisplayMode]);

  useEffect(() => {
    if (isGamesInitiallyFetched && hasUnresolvedGames) {
      dispatch(setGamesDisplayMode(GamesDisplayMode.My));
    }
  }, [hasUnresolvedGames, isGamesInitiallyFetched]);
}
