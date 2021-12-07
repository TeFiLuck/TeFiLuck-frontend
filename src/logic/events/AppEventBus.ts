import { createEventBus } from './createEventBus';

export enum AppEvents {
  CURRENT_BLOCK_NUMBER_CHANGE = 'CURRENT_BLOCK_NUMBER_CHANGE',
}

export interface AppEventsMap {
  [AppEvents.CURRENT_BLOCK_NUMBER_CHANGE]: {
    blockNumber: number;
  };
}

export const AppEventBus = createEventBus<AppEventsMap>();
