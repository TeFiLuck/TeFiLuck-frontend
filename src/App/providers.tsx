import store from '@/state/store';
import { FC, StrictMode } from 'react';
import { Provider } from 'react-redux';

export const AppProviders: FC = ({ children }) => {
  return (
    <StrictMode>
      <Provider store={store}>
        {children}
      </Provider>
    </StrictMode>
  );
}
