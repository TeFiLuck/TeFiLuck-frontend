import { AppAPI } from '@/api/app';
import { CoinflipEventBus, CoinflipEvents } from '@/logic/events';
import { useEffect, useState } from 'react';
import { useNetwork } from '../useNetwork';

export function useOpenGamesCount() {
  const [isGamesCountLoading, setIsGamesCountLoading] = useState(true);
  const [gamesCount, setGamesCount] = useState(0);
  const { networkKey } = useNetwork();

  useEffect(() => {
    loadGamesCount();
  }, [networkKey]);

  useEffect(() => {
    CoinflipEventBus.subscribe(CoinflipEvents.GAME_CREATED, incrementGamesCount);
    CoinflipEventBus.subscribe(CoinflipEvents.GAME_CANCELED, decrementGamesCount);
    CoinflipEventBus.subscribe(CoinflipEvents.GAME_ACCEPTED, decrementGamesCount);

    return () => {
      CoinflipEventBus.unsubscribe(CoinflipEvents.GAME_CREATED, incrementGamesCount);
      CoinflipEventBus.unsubscribe(CoinflipEvents.GAME_CANCELED, decrementGamesCount);
      CoinflipEventBus.unsubscribe(CoinflipEvents.GAME_ACCEPTED, decrementGamesCount);
    };
  });

  function incrementGamesCount(): void {
    setGamesCount(gamesCount + 1);
  }

  function decrementGamesCount(): void {
    if (gamesCount) setGamesCount(gamesCount - 1);
  }

  async function loadGamesCount(): Promise<void> {
    try {
      setIsGamesCountLoading(true);
      const { count } = await AppAPI.coinflip.fetchOpenGamesCount({ networkKey });
      setGamesCount(count);
    } catch (err) {
      console.error('Failed to load open games count.');
    } finally {
      setIsGamesCountLoading(false);
    }
  }

  return { gamesCount, isGamesCountLoading };
}
