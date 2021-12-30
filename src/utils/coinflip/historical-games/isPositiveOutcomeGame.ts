import { HistoricalGame } from '@/typings/coinflip';

export function isPositiveOutcomeGame(game: HistoricalGame, address: string): boolean {
  return game.winner === address || game.liquidator === address;
}
