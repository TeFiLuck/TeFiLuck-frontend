import { DEFAULT_TERRA_TOKENS_DECIMALS, TokenSymbol } from '@/constants/tokens';
import { getTokenDecimalsBySymbol } from '@/utils/tokens';

export function fromUAmount(amount: string, symbol?: TokenSymbol): number {
  const decimals = symbol ? getTokenDecimalsBySymbol(symbol) : DEFAULT_TERRA_TOKENS_DECIMALS;
  return Number(amount) / 10 ** decimals;
}
