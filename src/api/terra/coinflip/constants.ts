import { NetworkKey } from '@/constants/networks';

export const MAIN_CONTRACT_ADDRESS: Record<NetworkKey, string> = <const>{
  [NetworkKey.MAINNET]: 'terra1kpd5mw57au4l9q7kh7vcxt42z500hvgz5ulpz7',
  [NetworkKey.TESTNET]: 'terra1kpd5mw57au4l9q7kh7vcxt42z500hvgz5ulpz7',
};

export enum ActionType {
  PLACE_BET = 'place_bet',
}
