import { TERRA_NATIVE_TOKENS, TokenSymbol } from '@/constants/tokens';
import { NetworkInfo } from '@terra-money/wallet-provider';

export type Network = NetworkInfo;

export type NativeTokensBalances = Record<typeof TERRA_NATIVE_TOKENS[number], number>;

export type TokensBalances = NativeTokensBalances;

export type Token = {
  symbol: TokenSymbol;
  logo: string;
  balance: number;
};
