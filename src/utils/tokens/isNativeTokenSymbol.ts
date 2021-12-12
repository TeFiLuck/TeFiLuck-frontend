import { TERRA_NATIVE_TOKENS, TokenSymbol } from '@/constants/tokens';

export function isNativeTokenSymbol(symbol: TokenSymbol): boolean {
  return TERRA_NATIVE_TOKENS.includes(symbol);
}
