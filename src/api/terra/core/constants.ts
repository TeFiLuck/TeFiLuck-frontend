import { NetworkKey } from '@/constants/networks';
import { GasPricesMap } from './types';

export const TX_POLLING_INTERVAL_MS = 1000;
export const MAX_TX_POLLING_RETRIES = 30;

export const GAS_PRICES_ENDPOINT_URN = '/v1/txs/gas_prices';
export const TRANSACTION_ENDPOINT_URN = (txHash: string) => `/txs/${txHash}`;

export const FALLBACK_GAS_PRICES_MAP: Record<NetworkKey, GasPricesMap> = {
  [NetworkKey.MAINNET]: {
    uluna: '0.01133',
    usdr: '0.104938',
    uusd: '0.15',
    ukrw: '169.77',
    umnt: '428.571',
    ueur: '0.125',
    ucny: '0.98',
    ujpy: '16.37',
    ugbp: '0.11',
    uinr: '10.88',
    ucad: '0.19',
    uchf: '0.14',
    uaud: '0.19',
    usgd: '0.2',
    uthb: '4.62',
    usek: '1.25',
    unok: '1.25',
    udkk: '0.9',
    uidr: '2180.0',
    uphp: '7.6',
    uhkd: '1.17',
  },
  [NetworkKey.TESTNET]: {
    uluna: '0.01133',
    usdr: '0.104938',
    uusd: '0.15',
    ukrw: '169.77',
    umnt: '428.571',
    ueur: '0.125',
    ucny: '0.98',
    ujpy: '16.37',
    ugbp: '0.11',
    uinr: '10.88',
    ucad: '0.19',
    uchf: '0.14',
    uaud: '0.19',
    usgd: '0.2',
    uthb: '4.62',
    usek: '1.25',
    unok: '1.25',
    udkk: '0.9',
    uidr: '2180.0',
    uphp: '7.6',
    uhkd: '1.17',
  },
};
