import { GameOutcome } from '@/constants/coinflip';
import { HistoricalGame } from '@/typings/coinflip';

export function isGameLiquidated(game: HistoricalGame): boolean {
  return game.outcome === GameOutcome.Liquidated;
}
