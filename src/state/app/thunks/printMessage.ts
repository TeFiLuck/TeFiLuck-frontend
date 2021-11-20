import { AppMessage, AppMessageType } from '@/typings/app';
import { Partial } from '@/typings/general';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { addMessage } from '../actions';

export const printError = createAsyncThunk(
  'app/printError',
  (message: Partial<AppMessage>, { dispatch }) => {
    dispatch(
      addMessage({
        type: AppMessageType.Error,
        ...message,
      }),
    );
  },
);

export const printWarning = createAsyncThunk(
  'app/printWarning',
  (message: Partial<AppMessage>, { dispatch }) => {
    dispatch(
      addMessage({
        type: AppMessageType.Warning,
        ...message,
      }),
    );
  },
);

export const printSuccess = createAsyncThunk(
  'app/printSuccess',
  (message: Partial<AppMessage>, { dispatch }) => {
    dispatch(
      addMessage({
        type: AppMessageType.Success,
        ...message,
      }),
    );
  },
);

export const printInfo = createAsyncThunk(
  'app/printInfo',
  (message: Partial<AppMessage>, { dispatch }) => {
    dispatch(
      addMessage({
        type: AppMessageType.Info,
        ...message,
      }),
    );
  },
);
