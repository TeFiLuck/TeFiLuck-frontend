import { TokenSymbol } from '@/constants/tokens';
import { isNativeTokenSymbol } from './isNativeTokenSymbol';

export function isCW20TokenSymbol(symbol: TokenSymbol): boolean {
  return !isNativeTokenSymbol(symbol);
}
