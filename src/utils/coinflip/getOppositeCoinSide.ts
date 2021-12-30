import { CoinSide } from '@/constants/coinflip';

export function getOppositeCoinSide(side: CoinSide): CoinSide {
  return side === CoinSide.Heads ? CoinSide.Tails : CoinSide.Heads;
}
