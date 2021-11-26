import { TokenSymbol } from '@/constants/tokens';

export type BetSizesRange<T extends number | string> = {
  tokenSymbol: TokenSymbol;
  min: T;
  max: T;
};
