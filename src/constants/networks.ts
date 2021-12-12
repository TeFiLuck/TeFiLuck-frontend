import { Network } from '@/typings/finance-management';

export enum NetworkKey {
  MAINNET = 'columbus-5',
  TESTNET = 'bombay-12',
}

export const Networks: Record<NetworkKey, Network> = <const>{
  [NetworkKey.MAINNET]: {
    name: 'mainnet',
    chainID: 'columbus-5',
    lcd: 'https://lcd.terra.dev',
    fcd: 'https://fcd.terra.dev',
    id: 'columbus-5',
    mantle: 'https://fcd.terra.dev/',
    stats: 'https://fcd.terra.dev/',
    fee: { maxGas: '2000000' },
  },
  [NetworkKey.TESTNET]: {
    name: 'testnet',
    chainID: 'bombay-12',
    lcd: 'https://bombay-lcd.terra.dev',
    fcd: 'https://bombay-fcd.terra.dev',
    id: 'bombay-12',
    mantle: 'https://bombay-mantle.terra.dev/',
    stats: 'https://bombay-fcd.terra.dev/',
    fee: { maxGas: '2000000' },
  },
};

export const DEFAULT_NETWORK_KEY = import.meta.env.DEV ? NetworkKey.TESTNET : NetworkKey.MAINNET;
export const WALLET_CONNECT_CHAIN_IDS = <const>{
  0: Networks[NetworkKey.TESTNET],
  1: Networks[NetworkKey.MAINNET],
};

export const TERRA_BLOCK_GENERATION_TIME_SEC = 5;
