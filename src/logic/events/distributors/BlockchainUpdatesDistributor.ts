import { BlockchainUpdatesSocketMessageType, BlockchainUpdatesSocketPayloadTypes } from '@/typings/app';
import { AppEventBus, AppEvents } from '../AppEventBus';
import { CoinflipEventBus, CoinflipEvents } from '../CoinflipEventBus';
import { EventsDistributor } from './types';

const MessagesHandlersMap: Record<string, (data: any) => void> = {
  [BlockchainUpdatesSocketMessageType.BLOCK_MESSAGE]: (
    data: BlockchainUpdatesSocketPayloadTypes[BlockchainUpdatesSocketMessageType.BLOCK_MESSAGE],
  ) => {
    AppEventBus.trigger(AppEvents.CURRENT_BLOCK_NUMBER_CHANGE, {
      blockNumber: Number(data.height),
    });
  },
  [BlockchainUpdatesSocketMessageType.GAME_CREATED_MESSAGE]: (
    data: BlockchainUpdatesSocketPayloadTypes[BlockchainUpdatesSocketMessageType.GAME_CREATED_MESSAGE],
  ) => {
    CoinflipEventBus.trigger(CoinflipEvents.GAME_CREATED, {
      game: data,
    });
  },
  [BlockchainUpdatesSocketMessageType.GAME_CANCELED_MESSAGE]: (
    data: BlockchainUpdatesSocketPayloadTypes[BlockchainUpdatesSocketMessageType.GAME_CANCELED_MESSAGE],
  ) => {
    CoinflipEventBus.trigger(CoinflipEvents.GAME_CANCELED, {
      gameId: data.betId,
    });
  },
  [BlockchainUpdatesSocketMessageType.GAME_ACCEPTED_MESSAGE]: (
    data: BlockchainUpdatesSocketPayloadTypes[BlockchainUpdatesSocketMessageType.GAME_ACCEPTED_MESSAGE],
  ) => {
    CoinflipEventBus.trigger(CoinflipEvents.GAME_ACCEPTED, {
      game: data,
    });
  },
  [BlockchainUpdatesSocketMessageType.GAME_RESOLVED_MESSAGE]: (
    data: BlockchainUpdatesSocketPayloadTypes[BlockchainUpdatesSocketMessageType.GAME_RESOLVED_MESSAGE],
  ) => {
    CoinflipEventBus.trigger(CoinflipEvents.GAME_RESOLVED, {
      game: data,
    });
  },
  [BlockchainUpdatesSocketMessageType.GAME_LIQUIDATED_MESSAGE]: (
    data: BlockchainUpdatesSocketPayloadTypes[BlockchainUpdatesSocketMessageType.GAME_LIQUIDATED_MESSAGE],
  ) => {
    CoinflipEventBus.trigger(CoinflipEvents.GAME_LIQUIDATED, {
      game: data,
    });
  },
};

export const BlockchainUpdatesDistributor: EventsDistributor = {
  handle(payload) {
    const handleMessage = MessagesHandlersMap[payload?.type];

    if (handleMessage) {
      handleMessage(payload.data);
    }
  },
};
