import { NetworkKey } from '@/constants/networks';

export const MAIN_CONTRACT_ADDRESS: Record<NetworkKey, string> = <const>{
  [NetworkKey.MAINNET]: 'terra1v7fzavput5c5jqy866ytdnzkft9xmtv9xj6er2',
  [NetworkKey.TESTNET]: 'terra1v7fzavput5c5jqy866ytdnzkft9xmtv9xj6er2',
};

export enum ActionType {
  PLACE_BET = 'place_bet',
  ACCEPT_BET = 'respond_bet',
  CANCEL_BET = 'withdraw_pending_bet',
}
