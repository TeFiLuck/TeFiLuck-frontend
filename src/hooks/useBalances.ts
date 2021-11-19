import { fetchNativeTokensBalancesFromAddress } from '@/api/terra';
import { useConnectedWallet } from '@terra-money/wallet-provider';
import { useEffect, useState } from 'react';
import { useLCDClient } from './useLCDClient';

export function useBalances() {
  const LCDCClient = useLCDClient();
  const connectedWallet = useConnectedWallet();
  const [balanceUpdateRenderCounter, setBalanceUpdateRenderCounter] = useState(1);

  const [lunaBalance, setLunaBalance] = useState(0);
  const [ustBalance, setUstBalance] = useState(0);

  useEffect(() => {
    if (connectedWallet && LCDCClient) {
      fetchNativeTokensBalancesFromAddress(LCDCClient, connectedWallet.walletAddress).then(
        (balances) => {
          setLunaBalance(balances.luna);
          setUstBalance(balances.ust);
        },
      );
    } else {
      resetBalances();
    }
  }, [connectedWallet, LCDCClient, balanceUpdateRenderCounter]);

  function resetBalances(): void {
    setLunaBalance(0);
    setUstBalance(0);
  }

  function updateBalances(): void {
    setBalanceUpdateRenderCounter(balanceUpdateRenderCounter + 1);
  }

  return { lunaBalance, ustBalance, updateBalances };
}
