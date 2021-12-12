import { NetworkKey } from '@/constants/networks';

export const MAIN_CONTRACT_ADDRESS: Record<NetworkKey, string> = <const>{
  [NetworkKey.MAINNET]: 'terra1reg38wm2c88xc2af9dj2nnm9kt82wav3kmduye',
  [NetworkKey.TESTNET]: 'terra1reg38wm2c88xc2af9dj2nnm9kt82wav3kmduye',
};

export enum ActionType {
  PLACE_BET = 'place_bet',
}
