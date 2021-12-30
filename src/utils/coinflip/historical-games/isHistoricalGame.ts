import { Game, HistoricalGame } from '@/typings/coinflip';

export function isHistoricalGame(game: Game): game is HistoricalGame {
  return 'winner' in game;
}
