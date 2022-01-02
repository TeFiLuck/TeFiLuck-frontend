import { Game, HistoricalGame, OngoingGame } from './coinflip';

export type BaseSize = 'small' | 'medium' | 'large';
export type TooltipPlacement =
  | 'top'
  | 'left'
  | 'right'
  | 'bottom'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight'
  | 'leftTop'
  | 'leftBottom'
  | 'rightTop'
  | 'rightBottom';

export enum AppMessageType {
  Success = 'success',
  Info = 'info',
  Warning = 'warning',
  Error = 'error',
}

export type AppMessage = {
  type: AppMessageType;
  title: string;
  description: string;
  placement: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
};

export enum BlockchainUpdatesSocketMessageType {
  BLOCK_MESSAGE = 'block_message',
  GAME_CREATED_MESSAGE = 'place_bet_message',
  GAME_CANCELED_MESSAGE = 'withdraw_pending_bet_message',
  GAME_ACCEPTED_MESSAGE = 'respond_bet_message',
  GAME_RESOLVED_MESSAGE = 'resolve_bet_message',
  GAME_LIQUIDATED_MESSAGE = 'liquidate_bet_message',
}

export type BlockchainUpdatesSocketPayloadTypes = {
  [BlockchainUpdatesSocketMessageType.BLOCK_MESSAGE]: {
    height: string;
  };
  [BlockchainUpdatesSocketMessageType.GAME_CREATED_MESSAGE]: Game;
  [BlockchainUpdatesSocketMessageType.GAME_CANCELED_MESSAGE]: {
    betId: string;
  };
  [BlockchainUpdatesSocketMessageType.GAME_ACCEPTED_MESSAGE]: OngoingGame;
  [BlockchainUpdatesSocketMessageType.GAME_RESOLVED_MESSAGE]: HistoricalGame;
  [BlockchainUpdatesSocketMessageType.GAME_LIQUIDATED_MESSAGE]: HistoricalGame;
};
