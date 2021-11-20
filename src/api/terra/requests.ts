import { TERRA_NATIVE_TOKENS, TokenSymbol } from '@/constants/tokens';
import { NativeTokensBalances } from '@/typings/finance-management';
import { getTokenSymbolByDenom } from '@/utils/tokens';
import { LCDClient } from '@terra-money/terra.js';
import { getTokenAmountNumber } from './utils';

export async function fetchNativeTokensBalancesFromAddress(
  client: LCDClient,
  address: string,
): Promise<NativeTokensBalances> {
  const [tokens] = await client.bank.balance(address);
  const result = {} as NativeTokensBalances;

  TERRA_NATIVE_TOKENS.forEach((symbol) => {
    result[symbol] = 0;
  });

  tokens.map((token) => {
    const amount = getTokenAmountNumber(token);
    const tokenSymbol = getTokenSymbolByDenom(token.denom) as TokenSymbol;

    if (TERRA_NATIVE_TOKENS.includes(tokenSymbol)) {
      result[tokenSymbol] = amount;
    }
  });

  return result;
}
