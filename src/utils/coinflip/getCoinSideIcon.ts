import { ReactComponent as HeadsIcon } from '@/assets/images/heads-logo.svg';
import { ReactComponent as TailsIcon } from '@/assets/images/tails-logo.svg';
import { CoinSide } from '@/constants/coinflip';

export function getCoinSideIcon(side: CoinSide) {
  return side === CoinSide.Heads ? HeadsIcon : TailsIcon;
}
