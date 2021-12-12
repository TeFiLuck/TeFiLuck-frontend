import { DEFAULT_TERRA_TOKENS_DECIMALS, TokenSymbol } from '@/constants/tokens';
import { getTokenDecimalsBySymbol } from '@/utils/tokens';
import { Coin } from '@terra-money/terra.js';

export function getAmountFromCoin(coin: Coin, symbol?: TokenSymbol): number {
  const decimals = symbol ? getTokenDecimalsBySymbol(symbol) : DEFAULT_TERRA_TOKENS_DECIMALS;

  return Number(
    coin
      .toDecCoin()
      .div(10 ** decimals)
      .toData().amount,
  );
}
