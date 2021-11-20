import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import app from './app/reducer';
import financeManagement, { FinanceManagementState } from './finance-management/reducer';

const financeManagementPersistConfig = {
  key: 'financeManagement',
  storage: storage,
  whitelist: ['mainTokenSymbol'],
};

export const store = configureStore({
  reducer: {
    app,
    financeManagement: persistReducer<FinanceManagementState>(
      financeManagementPersistConfig,
      financeManagement,
    ),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
