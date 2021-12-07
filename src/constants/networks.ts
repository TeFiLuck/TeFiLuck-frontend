import { Network } from '@/typings/finance-management';

export enum NetworkKey {
  MAINNET = 'mainnet',
  TESTNET = 'testnet',
}

export const Networks: Record<NetworkKey, Network> = <const>{
  [NetworkKey.MAINNET]: {
    name: 'mainnet',
    chainID: 'columbus-5',
    lcd: 'https://lcd.terra.dev',
  },
  [NetworkKey.TESTNET]: {
    name: 'testnet',
    chainID: 'bombay-12',
    lcd: 'https://bombay-lcd.terra.dev',
  },
};

export const DEFAULT_NETWORK_KEY = import.meta.env.DEV ? NetworkKey.TESTNET : NetworkKey.MAINNET;
export const WALLET_CONNECT_CHAIN_IDS = <const>{
  0: Networks[NetworkKey.TESTNET],
  1: Networks[NetworkKey.MAINNET],
};

export const TERRA_DECIMALS = 6;
export const TERRA_BLOCK_GENERATION_TIME_SEC = 5;
