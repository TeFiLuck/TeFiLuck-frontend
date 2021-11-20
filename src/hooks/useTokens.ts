import { SUPPORTED_TOKENS } from '@/constants/finance-management';
import { useAppSelector } from '@/state';
import { Token } from '@/typings/finance-management';
import { getTokenLogoBySymbol } from '@/utils/tokens';
import { useBalances } from './useBalances';

export function useTokens() {
  const { balances } = useBalances();
  const { mainTokenSymbol } = useAppSelector((state) => state.financeManagement);

  const supportedTokens: Token[] = SUPPORTED_TOKENS.map((tokenSymbol) => ({
    symbol: tokenSymbol,
    logo: getTokenLogoBySymbol(tokenSymbol),
    balance: balances[tokenSymbol],
  }));

  const mainToken: Token = {
    symbol: mainTokenSymbol,
    logo: getTokenLogoBySymbol(mainTokenSymbol),
    balance: balances[mainTokenSymbol],
  };

  return { supportedTokens, mainToken };
}
