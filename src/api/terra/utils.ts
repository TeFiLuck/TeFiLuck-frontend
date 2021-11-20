import { TERRA_DECIMALS } from '@/constants/networks';
import { Coin } from '@terra-money/terra.js';

export function getTokenAmountNumber(coin: Coin): number {
  return Number(
    coin
      .toDecCoin()
      .div(10 ** TERRA_DECIMALS)
      .toData().amount,
  );
}
