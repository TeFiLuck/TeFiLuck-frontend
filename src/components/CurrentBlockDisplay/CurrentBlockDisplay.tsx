import { APP_LIGHT_COLOR_1 } from '@/assets/styles/design';
import { UiLink } from '@/components/ui';
import { TooltipPlacement } from '@/typings/app';
import { Tooltip } from 'antd';
import { FC } from 'react';

export interface CurrentBlockDisplayProps {
  tooltipPlacement?: TooltipPlacement;
}

const CurrentBlockDisplay: FC<CurrentBlockDisplayProps> = ({ tooltipPlacement = 'bottomRight' }) => {
  const currentBlockNumber = 5470893;
  const blockLink = `https://finder.extraterrestrial.money/columbus-5/blocks/${currentBlockNumber}`;

  return (
    <Tooltip title="Current Terra block number" placement={tooltipPlacement}>
      <span>
        <UiLink to={blockLink} mode="html" openHtmlLinkSeparately color={APP_LIGHT_COLOR_1}>
          {currentBlockNumber}
        </UiLink>
      </span>
    </Tooltip>
  );
};

export default CurrentBlockDisplay;
