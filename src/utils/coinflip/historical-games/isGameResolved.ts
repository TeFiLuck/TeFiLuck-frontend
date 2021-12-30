import { GameOutcome } from '@/constants/coinflip';
import { HistoricalGame } from '@/typings/coinflip';

export function isGameResolved(game: HistoricalGame): boolean {
  return game.outcome === GameOutcome.Resolved;
}
