import App from '@/App/App';
import WalletConnectProvider from '@/App/providers/WalletConnectProvider/WalletConnectProvider';
import '@/assets/styles/main.css';
import { persistor, store } from '@/state/store';
import 'antd/dist/antd.dark.less';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import 'simplebar/src/simplebar.css';
import { registerSW } from 'virtual:pwa-register';

registerSW();

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <WalletConnectProvider>
          <App />
        </WalletConnectProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
  document.querySelector('#root'),
);
