import { NetworkInfo } from '@terra-money/wallet-provider';

export enum NetworkKey {
  MAINNET = 'mainnet',
  TESTNET = 'testnet',
}

export type Network = NetworkInfo;
