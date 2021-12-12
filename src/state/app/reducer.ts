import { AppMessage, AppMessageType } from '@/typings/app';
import { createReducer } from '@reduxjs/toolkit';
import { addMessage, popMessagesStack, setIsBlockchainUpdatesSocketConnected } from './actions';

export interface AppState {
  messages: AppMessage[];
  isBlockchainUpdatesSocketConnected: boolean;
}

export const initialState: AppState = {
  messages: [],
  isBlockchainUpdatesSocketConnected: false,
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(addMessage, (state, { payload }) => {
      state.messages.push({
        type: AppMessageType.Info,
        title: '',
        description: '',
        placement: 'topRight',
        ...payload,
      });
    })
    .addCase(popMessagesStack, (state) => {
      if (state.messages.length) {
        state.messages.splice(0, 1);
      }
    })
    .addCase(setIsBlockchainUpdatesSocketConnected, (state, { payload }) => {
      state.isBlockchainUpdatesSocketConnected = payload;
    }),
);
