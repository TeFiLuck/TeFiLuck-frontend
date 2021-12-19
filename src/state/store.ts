import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import app from './app/reducer';
import coinflip, { CoinflipState } from './coinflip/reducer';
import financeManagement, { FinanceManagementState } from './finance-management/reducer';

const financeManagementPersistConfig = {
  key: 'financeManagement',
  storage: storage,
  whitelist: ['mainTokenSymbol'],
};

const coinflipPersistConfig = {
  key: 'coinflip',
  storage: storage,
  whitelist: ['isGameFlowAlertVisible', 'savedPasswords'],
};

export const store = configureStore({
  reducer: {
    app,
    financeManagement: persistReducer<FinanceManagementState>(financeManagementPersistConfig, financeManagement),
    coinflip: persistReducer<CoinflipState>(coinflipPersistConfig, coinflip),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
