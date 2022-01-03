import { NetworkKey } from '@/constants/networks';

export const MAIN_CONTRACT_ADDRESS: Record<NetworkKey, string> = <const>{
  [NetworkKey.MAINNET]: 'terra1nzmkztt9q682yxpza24y3kvtzgt48decpk8x3r',
  [NetworkKey.TESTNET]: 'terra16ufphdk7gaptp3ycxkd9qwa9la7yl0jw6pdrct',
};

export enum ActionType {
  PLACE_BET = 'place_bet',
  ACCEPT_BET = 'respond_bet',
  CANCEL_BET = 'withdraw_pending_bet',
  LIQUIDATE_BET = 'liquidate_bet',
  RESOLVE_BET = 'resolve_bet',
}
