import { NetworkKey } from '@/constants/networks';

export const MAIN_CONTRACT_ADDRESS: Record<NetworkKey, string> = <const>{
  [NetworkKey.MAINNET]: 'terra13qwejqvsna8wffj9plvv594d348dm52sut4wx3',
  [NetworkKey.TESTNET]: 'terra13qwejqvsna8wffj9plvv594d348dm52sut4wx3',
};

export enum ActionType {
  PLACE_BET = 'place_bet',
  ACCEPT_BET = 'respond_bet',
  CANCEL_BET = 'withdraw_pending_bet',
  LIQUIDATE_BET = 'liquidate_bet',
  RESOLVE_BET = 'resolve_bet',
}
