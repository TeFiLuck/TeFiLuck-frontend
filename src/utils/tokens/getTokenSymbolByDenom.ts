import { TokenSymbol, TOKENS_DENOMS } from '@/constants/tokens';

export function getTokenSymbolByDenom(denom: string): TokenSymbol | null {
  const result = Object.entries(TOKENS_DENOMS).find(([, value]) => {
    return value === denom;
  });

  if (!result) return null;

  return result[0] as TokenSymbol;
}
