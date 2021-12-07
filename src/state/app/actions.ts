import { AppMessage } from '@/typings/app';
import { Partial } from '@/typings/general';
import { createAction } from '@reduxjs/toolkit';

export const popMessagesStack = createAction('app/popMessagesStack');
export const addMessage = createAction<Partial<AppMessage>>('app/addMessage');
export const setIsBlockchainUpdatesSocketConnected = createAction<boolean>('app/setIsBlockchainUpdatesSocketConnected');
export const setCurrentBlockNumber = createAction<number>('app/setCurrentBlockNumber');
