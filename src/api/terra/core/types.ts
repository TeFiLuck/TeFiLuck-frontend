import { TokenSymbol } from '@/constants/tokens';
import { NativeTokenSymbol } from '@/typings/finance-management';
import { CreateTxOptions } from '@terra-money/terra.js';
import { ConnectedWallet } from '@terra-money/wallet-provider';

export interface GasPricesMap {
  uluna: string;
  usdr: string;
  uusd: string;
  ukrw: string;
  umnt: string;
  ueur: string;
  ucny: string;
  ujpy: string;
  ugbp: string;
  uinr: string;
  ucad: string;
  uchf: string;
  uaud: string;
  usgd: string;
  uthb: string;
  usek: string;
  unok: string;
  udkk: string;
  uidr: string;
  uphp: string;
  uhkd: string;
}

export type Token = [TokenSymbol, number];

export interface ContractCallEvaluationParams {
  wallet: ConnectedWallet;
  txOptions: CreateTxOptions;
  feeTokenSymbol?: NativeTokenSymbol;
  maxRetries?: number;
}

export interface ContractCallExecutionParams<T> {
  wallet: ConnectedWallet;
  sendTokens: Token[];
  payload: T;
  feeTokenSymbol?: NativeTokenSymbol;
  evaluationRetries?: number;
}
