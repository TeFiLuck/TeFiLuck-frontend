import { DEFAULT_NETWORK, WALLET_CONNECT_CHAIN_IDS } from '@/config/networks';
import { WalletProvider } from '@terra-money/wallet-provider';
import { FC } from 'react';

const WalletConnectProvider: FC = ({ children }) => {
  return (
    <WalletProvider
      defaultNetwork={DEFAULT_NETWORK}
      walletConnectChainIds={WALLET_CONNECT_CHAIN_IDS}
    >
      {children}
    </WalletProvider>
  );
};

export default WalletConnectProvider;
