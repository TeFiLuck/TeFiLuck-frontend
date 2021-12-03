import { APP_COIN_HEADS_COLOR, APP_COIN_TAILS_COLOR } from '@/assets/styles/design';
import { CoinSide } from '@/constants/coinflip';

export function getCoinSideColor(side: CoinSide): string {
  return side === CoinSide.Heads ? APP_COIN_HEADS_COLOR : APP_COIN_TAILS_COLOR;
}
