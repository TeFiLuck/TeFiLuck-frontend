import { TokenSymbol } from '@/constants/tokens';
import { isNativeTokenSymbol } from '@/utils/tokens';

export function isTaxableTokenSymbol(symbol: TokenSymbol): boolean {
  return isNativeTokenSymbol(symbol);
}
