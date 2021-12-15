import { APP_LIGHT_COLOR_1 } from '@/assets/styles/design';
import { UiLink, UiSkeleton } from '@/components/ui';
import { useNetwork } from '@/hooks';
import { AppEventBus, AppEvents, AppEventsMap } from '@/logic/events';
import { TooltipPlacement } from '@/typings/app';
import { getTerraBlockNumberLink } from '@/utils/networks';
import { Tooltip } from 'antd';
import { FC, useEffect, useState } from 'react';

export interface CurrentBlockNumberDisplayProps {
  tooltipPlacement?: TooltipPlacement;
  loading?: boolean;
}

const CurrentBlockNumberDisplay: FC<CurrentBlockNumberDisplayProps> = ({
  tooltipPlacement = 'bottomRight',
  loading = false,
}) => {
  const [currentBlockNumber, setCurrentBlockNumber] = useState(0);
  const { networkKey } = useNetwork();

  const blockLink = getTerraBlockNumberLink(currentBlockNumber, networkKey);
  const isLoading = loading || !currentBlockNumber;

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

  return (
    <>
      {isLoading ? (
        <UiSkeleton width="75px" />
      ) : (
        <Tooltip title="Current Terra block number" placement={tooltipPlacement}>
          <span>
            <UiLink to={blockLink} mode="html" openHtmlLinkSeparately color={APP_LIGHT_COLOR_1}>
              {currentBlockNumber}
            </UiLink>
          </span>
        </Tooltip>
      )}
    </>
  );
};

export default CurrentBlockNumberDisplay;
