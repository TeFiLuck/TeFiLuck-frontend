import { BlockchainUpdatesSocketMessageType, BlockchainUpdatesSocketPayloadTypes } from '@/typings/app';
import { AppEventBus, AppEvents } from '../AppEventBus';
import { EventsDistributor } from './types';

const MessagesHandlersMap: Record<string, (data: any) => void> = {
  [BlockchainUpdatesSocketMessageType.BLOCK_MESSAGE]: (
    data: BlockchainUpdatesSocketPayloadTypes[BlockchainUpdatesSocketMessageType.BLOCK_MESSAGE],
  ) => {
    AppEventBus.trigger(AppEvents.CURRENT_BLOCK_NUMBER_CHANGE, {
      blockNumber: Number(data.height),
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
