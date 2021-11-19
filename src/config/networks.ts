import { Network, NetworkKey } from '@/typings/finance-management';

export const Networks: Record<NetworkKey, Network> = {
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

export const DEFAULT_NETWORK = Networks[NetworkKey.MAINNET];
export const WALLET_CONNECT_CHAIN_IDS: Record<number, Network> = {
  0: Networks[NetworkKey.TESTNET],
  1: Networks[NetworkKey.MAINNET],
};

export const TERRA_DECIMALS = 6;
