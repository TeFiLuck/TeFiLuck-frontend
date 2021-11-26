import { LCDClient } from '@terra-money/terra.js';
import { useMemo } from 'react';
import { useConnectedWallet } from './useConnectedWallet';

export function useLCDClient(): LCDClient | null {
  const { connectedWallet } = useConnectedWallet();

  const client = useMemo(() => {
    if (!connectedWallet) {
      return null;
    }

    return new LCDClient({
      URL: connectedWallet.network.lcd,
      chainID: connectedWallet.network.chainID,
    });
  }, [connectedWallet]);

  return client;
}
