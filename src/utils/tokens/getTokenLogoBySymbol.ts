import DEFAULT_TOKEN_LOGO from '@/assets/images/tokens/default.svg';
import { TokenSymbol, TOKENS_LOGOS } from '@/constants/tokens';

export function getTokenLogoBySymbol(symbol: TokenSymbol): string {
  return TOKENS_LOGOS[symbol] || DEFAULT_TOKEN_LOGO;
}
