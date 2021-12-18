import { UiLink } from '@/components/ui';
import { GAME_FLOW_DESCRIPTION_ARTICLE_LINK } from '@/constants/company';
import { useMediaQueries } from '@/hooks';
import { Alert } from 'antd';
import { FC } from 'react';

export interface GameFlowAlertProps {
  style?: Record<string, string>;
}

const GameFlowAlert: FC<GameFlowAlertProps> = ({ style = {} }) => {
  const { is414PxOrLess } = useMediaQueries();

  return (
    <Alert
      message={
        <span style={{ fontSize: is414PxOrLess ? '10px' : '12px' }}>
          IMPORTANT,&nbsp;
          <UiLink to={GAME_FLOW_DESCRIPTION_ARTICLE_LINK} mode="html" openHtmlLinkSeparately uppercase underlined>
            learn about game flow
          </UiLink>
        </span>
      }
      type="warning"
      className="noselect"
      banner
      closable
      style={{ ...style }}
    />
  );
};

export default GameFlowAlert;
