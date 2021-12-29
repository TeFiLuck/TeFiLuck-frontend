import { AppEventBus, AppEvents, AppEventsMap } from '@/logic/events';
import { useEffect, useState } from 'react';
import { useNetwork } from './useNetwork';

export function useCurrentBlockNumber() {
  const { networkKey } = useNetwork();
  const [currentBlockNumber, setCurrentBlockNumber] = useState(0);
  const isCurrentBlockNumberLoading = !currentBlockNumber;

  useEffect(() => {
    AppEventBus.subscribe(AppEvents.CURRENT_BLOCK_NUMBER_CHANGE, handleBlockNumberChange);

    return () => {
      AppEventBus.unsubscribe(AppEvents.CURRENT_BLOCK_NUMBER_CHANGE, handleBlockNumberChange);
    };
  }, []);

  useEffect(() => setCurrentBlockNumber(0), [networkKey]);

  function handleBlockNumberChange({ blockNumber }: AppEventsMap[AppEvents.CURRENT_BLOCK_NUMBER_CHANGE]): void {
    setCurrentBlockNumber(blockNumber);
  }

  return { currentBlockNumber, isCurrentBlockNumberLoading };
}
