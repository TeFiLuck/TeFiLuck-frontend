import { AppEventBus, AppEvents, AppEventsMap } from '@/logic/events';
import { useAppDispatch } from '@/state';
import { setCurrentBlockNumber } from '@/state/app';
import { useEffect } from 'react';

export function useAppEventsHandling() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    AppEventBus.subscribe(AppEvents.CURRENT_BLOCK_NUMBER_CHANGE, handleBlockNumberChange);

    return () => {
      AppEventBus.unsubscribe(AppEvents.CURRENT_BLOCK_NUMBER_CHANGE, handleBlockNumberChange);
    };
  }, []);

  function handleBlockNumberChange({ blockNumber }: AppEventsMap[AppEvents.CURRENT_BLOCK_NUMBER_CHANGE]): void {
    dispatch(setCurrentBlockNumber(blockNumber));
  }
}
