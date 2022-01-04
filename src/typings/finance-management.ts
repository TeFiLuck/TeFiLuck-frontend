import { TERRA_NATIVE_TOKENS, TokenSymbol } from '@/constants/tokens';
import { NetworkInfo } from '@terra-money/wallet-provider';

export type Network = NetworkInfo & {
  fcd: string;
  id: string;
  mantle: string;
  stats: string;
  gasAdjustment: number;
};

export type NativeTokenSymbol = typeof TERRA_NATIVE_TOKENS[number];

export type NativeTokensBalances = Record<NativeTokenSymbol, number>;

export type TokensBalances = NativeTokensBalances;

export type Token = {
  symbol: TokenSymbol;
  ticker: string;
  logo: string;
  balance: number;
};

export interface TxResult {
  result: {
    height: number;
    raw_log: string;
    txhash: string;
  };
  success: boolean;
}

export type TransactionConfig = {
  title: string;
  executionAction: Promise<TxResult>;
};
