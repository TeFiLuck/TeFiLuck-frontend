import { Game, HistoricalGame, OngoingGame } from '@/typings/coinflip';
import { createEventBus } from './createEventBus';

export enum CoinflipEvents {
  GAME_CREATED = 'GAME_CREATED',
  GAME_CANCELED = 'GAME_CANCELED',
  GAME_ACCEPTED = 'GAME_ACCEPTED',
  GAME_RESOLVED = 'GAME_RESOLVED',
  GAME_LIQUIDATED = 'GAME_LIQUIDATED',
}

export interface CoinflipEventsMap {
  [CoinflipEvents.GAME_CREATED]: {
    game: Game;
  };
  [CoinflipEvents.GAME_CANCELED]: {
    gameId: string;
  };
  [CoinflipEvents.GAME_ACCEPTED]: {
    game: OngoingGame;
  };
  [CoinflipEvents.GAME_RESOLVED]: {
    game: HistoricalGame;
  };
  [CoinflipEvents.GAME_LIQUIDATED]: {
    game: HistoricalGame;
  };
}

export const CoinflipEventBus = createEventBus<CoinflipEventsMap>();
