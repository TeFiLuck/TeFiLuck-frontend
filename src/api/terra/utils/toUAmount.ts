import { DEFAULT_TERRA_TOKENS_DECIMALS, TokenSymbol } from '@/constants/tokens';
import { getTokenDecimalsBySymbol } from '@/utils/tokens';

export function toUAmount(amount: number, symbol?: TokenSymbol): string {
  const decimals = symbol ? getTokenDecimalsBySymbol(symbol) : DEFAULT_TERRA_TOKENS_DECIMALS;
  return String(amount * 10 ** decimals);
}
