import { HistoricalGame } from '@/typings/coinflip';
import { isPositiveOutcomeGame } from './isPositiveOutcomeGame';

export function isNegativeOutcomeGame(game: HistoricalGame, address: string): boolean {
  return !isPositiveOutcomeGame(game, address);
}
