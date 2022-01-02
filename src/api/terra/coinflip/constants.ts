import { NetworkKey } from '@/constants/networks';

export const MAIN_CONTRACT_ADDRESS: Record<NetworkKey, string> = <const>{
  [NetworkKey.MAINNET]: 'terra1v7767uu6a9pq8u49zes7grra5skvmmmua5x3cj',
  [NetworkKey.TESTNET]: 'terra1n3gvwgjmhpepjv6jaj7kj3ucnhmadhmu970uej',
};

export enum ActionType {
  PLACE_BET = 'place_bet',
  ACCEPT_BET = 'respond_bet',
  CANCEL_BET = 'withdraw_pending_bet',
  LIQUIDATE_BET = 'liquidate_bet',
  RESOLVE_BET = 'resolve_bet',
}
