import { TokenSymbol, TOKENS_TICKERS } from '@/constants/tokens';

export function getTokenTickerBySymbol(symbol: TokenSymbol): string {
  return TOKENS_TICKERS[symbol];
}
