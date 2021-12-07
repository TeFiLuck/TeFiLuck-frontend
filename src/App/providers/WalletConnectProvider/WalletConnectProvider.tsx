import { DEFAULT_NETWORK_KEY, Networks, WALLET_CONNECT_CHAIN_IDS } from '@/constants/networks';
import { WalletProvider } from '@terra-money/wallet-provider';
import { FC } from 'react';

const WalletConnectProvider: FC = ({ children }) => {
  return (
    <WalletProvider defaultNetwork={Networks[DEFAULT_NETWORK_KEY]} walletConnectChainIds={WALLET_CONNECT_CHAIN_IDS}>
      {children}
    </WalletProvider>
  );
};

export default WalletConnectProvider;
