import { MAX_BET_SIZE } from '@/constants/coinflip';
import { TokenSymbol } from '@/constants/tokens';
import { BetSizesRange } from '@/typings/coinflip';
import { getMinRequiredAmountToCreateGame } from './getMinRequiredAmountToCreateGame';

export function createFreshBetSizesRangeBySymbol(symbol: TokenSymbol): BetSizesRange<number> {
  return {
    tokenSymbol: symbol,
    min: getMinRequiredAmountToCreateGame(symbol),
    max: MAX_BET_SIZE,
  };
}
