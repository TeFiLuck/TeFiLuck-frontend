import { HistoricalGame } from '@/typings/coinflip';
import { isGameAcceptedByAddress } from '../isGameAcceptedByAddress';
import { isGameLiquidated } from './isGameLiquidated';
import { isGameLiquidatedByAddress } from './isGameLiquidatedByAddress';
import { isGameResolved } from './isGameResolved';

export function isGameCompletedByAnotherAddress(game: HistoricalGame, address: string): boolean {
  return (
    (isGameAcceptedByAddress(game, address) && isGameResolved(game)) ||
    (isGameLiquidated(game) && !isGameLiquidatedByAddress(game, address))
  );
}
