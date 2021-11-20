import { TERRA_NATIVE_TOKENS } from '@/constants/tokens';
import { TokensBalances } from '@/typings/finance-management';

export function generateInitialBalancesState(): TokensBalances {
  const result = {} as TokensBalances;

  TERRA_NATIVE_TOKENS.forEach((symbol) => {
    result[symbol] = 0;
  });

  return result;
}
