import { APP_LIGHT_COLOR_1 } from '@/assets/styles/design';
import { UiLink, UiSkeleton } from '@/components/ui';
import { useNetwork } from '@/hooks';
import { useAppSelector } from '@/state';
import { TooltipPlacement } from '@/typings/app';
import { getTerraBlockNumberLink } from '@/utils/networks';
import { Tooltip } from 'antd';
import { FC } from 'react';

export interface CurrentBlockNumberDisplayProps {
  tooltipPlacement?: TooltipPlacement;
  loading?: boolean;
}

const CurrentBlockNumberDisplay: FC<CurrentBlockNumberDisplayProps> = ({
  tooltipPlacement = 'bottomRight',
  loading = false,
}) => {
  const { currentBlockNumber } = useAppSelector((state) => state.app);
  const { networkKey } = useNetwork();

  const blockLink = getTerraBlockNumberLink(currentBlockNumber, networkKey);
  const isLoading = loading || !currentBlockNumber;

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
