import { HistoricalGame } from '@/typings/coinflip';

export function isGameLiquidatedByAddress(game: HistoricalGame, address: string): boolean {
  return game.liquidator === address;
}
