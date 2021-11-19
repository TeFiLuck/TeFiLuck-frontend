import store from '@/state/store';
import { FC, StrictMode } from 'react';
import { Provider } from 'react-redux';
import WalletConnectProvider from './components/WalletConnectProvider/WalletConnectProvider';

export const AppProviders: FC = ({ children }) => {
  return (
    <StrictMode>
      <WalletConnectProvider>
        <Provider store={store}>{children}</Provider>
      </WalletConnectProvider>
    </StrictMode>
  );
};
