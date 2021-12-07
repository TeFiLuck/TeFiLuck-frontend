import { AppMessage, AppMessageType } from '@/typings/app';
import { createReducer } from '@reduxjs/toolkit';
import { addMessage, popMessagesStack, setCurrentBlockNumber, setIsBlockchainUpdatesSocketConnected } from './actions';

export interface AppState {
  messages: AppMessage[];
  isBlockchainUpdatesSocketConnected: boolean;
  currentBlockNumber: number;
}

export const initialState: AppState = {
  messages: [],
  isBlockchainUpdatesSocketConnected: false,
  currentBlockNumber: 0,
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
    })
    .addCase(setCurrentBlockNumber, (state, { payload }) => {
      state.currentBlockNumber = payload;
    }),
);
