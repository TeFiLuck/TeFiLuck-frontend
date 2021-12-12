import { Coin } from '@terra-money/terra.js';
import { Token } from '../core/types';
import { toUAmount } from './toUAmount';

export function convertTokenToCoin([tokenSymbol, tokenAmount]: Token): Coin {
  return Coin.fromString(`${toUAmount(tokenAmount)}${tokenSymbol}`);
}
