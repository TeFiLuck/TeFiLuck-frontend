import { NetworkKey } from '@/constants/networks';

export const MAIN_CONTRACT_ADDRESS: Record<NetworkKey, string> = <const>{
  [NetworkKey.MAINNET]: 'terra15m3xuj90ygl2a88vpjckrl7qw8q2tc64pdvfha',
  [NetworkKey.TESTNET]: 'terra15m3xuj90ygl2a88vpjckrl7qw8q2tc64pdvfha',
};

export enum ActionType {
  PLACE_BET = 'place_bet',
  ACCEPT_BET = 'respond_bet',
  CANCEL_BET = 'withdraw_pending_bet',
  LIQUIDATE_BET = 'liquidate_bet',
  RESOLVE_BET = 'resolve_bet',
}
