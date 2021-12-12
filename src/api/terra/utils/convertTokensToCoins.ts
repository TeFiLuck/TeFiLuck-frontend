import { Coins } from '@terra-money/terra.js';
import { Token } from '../core/types';
import { convertTokenToCoin } from './convertTokenToCoin';

export function convertTokensToCoins(tokens: Token[]): Coins {
  const coins = new Coins({});

  tokens.forEach((token) => {
    const coin = convertTokenToCoin(token);
    coins.set(coin.denom, coin.amount);
  });

  return coins;
}
