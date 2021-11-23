import { MIN_REQUIRED_AMOUNT_TO_CREATE_GAME_PER_TOKEN } from '@/constants/coinflip';
import { TokenSymbol } from '@/constants/tokens';

export function getMinRequiredAmountToCreateGame(tokenSymbol: TokenSymbol): number {
  // @ts-ignore
  return MIN_REQUIRED_AMOUNT_TO_CREATE_GAME_PER_TOKEN[tokenSymbol] || 0;
}
