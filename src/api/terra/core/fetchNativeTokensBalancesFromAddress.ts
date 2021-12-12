import { NetworkKey } from '@/constants/networks';
import { TERRA_NATIVE_TOKENS, TokenSymbol } from '@/constants/tokens';
import { NativeTokensBalances } from '@/typings/finance-management';
import { getAmountFromCoin, makeLCDClient } from '../utils';

export async function fetchNativeTokensBalancesFromAddress(
  networkKey: NetworkKey,
  address: string,
): Promise<NativeTokensBalances> {
  const client = makeLCDClient(networkKey);

  const [coins] = await client.bank.balance(address);
  const result = {} as NativeTokensBalances;

  TERRA_NATIVE_TOKENS.forEach((symbol) => {
    result[symbol] = 0;
  });

  coins.map((coin) => {
    const amount = getAmountFromCoin(coin);
    const tokenSymbol = coin.denom as TokenSymbol;

    if (TERRA_NATIVE_TOKENS.includes(tokenSymbol)) {
      result[tokenSymbol] = amount;
    }
  });

  return result;
}
