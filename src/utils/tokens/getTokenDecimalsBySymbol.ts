import { DEFAULT_TERRA_TOKENS_DECIMALS, TokenSymbol, TOKENS_DECIMALS } from '@/constants/tokens';

export function getTokenDecimalsBySymbol(symbol: TokenSymbol): number {
  const tokenSpecificDecimals = TOKENS_DECIMALS[symbol];
  if (tokenSpecificDecimals) return tokenSpecificDecimals;
  return DEFAULT_TERRA_TOKENS_DECIMALS;
}
