import { AppMessage, AppMessageType } from '@/typings/app';
import { createReducer } from '@reduxjs/toolkit';
import { addMessage, popMessagesStack } from './actions';

export interface AppState {
  messages: AppMessage[];
}

export const initialState: AppState = {
  messages: [],
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
    }),
);
