import { UiLink } from '@/components/ui';
import { GAME_FLOW_DESCRIPTION_ARTICLE_LINK } from '@/constants/company';
import { useAppDispatch, useAppSelector } from '@/state';
import { setIsGameFlowAlertVisible } from '@/state/coinflip';
import { Alert } from 'antd';
import { FC } from 'react';

export interface GameFlowAlertProps {
  style?: Record<string, string>;
}

const GameFlowAlert: FC<GameFlowAlertProps> = ({ style = {} }) => {
  const dispatch = useAppDispatch();
  const { isGameFlowAlertVisible } = useAppSelector((state) => state.coinflip);

  if (!isGameFlowAlertVisible) return <></>;

  return (
    <Alert
      message={
        <span>
          To avoid any possible confusion, please&nbsp;
          <UiLink to={GAME_FLOW_DESCRIPTION_ARTICLE_LINK} mode="html" openHtmlLinkSeparately underlined uppercase>
            Read this article about game flow
          </UiLink>
        </span>
      }
      banner
      className="noselect"
      type="warning"
      closeText="Don't show again"
      style={{ ...style }}
      onClose={() => dispatch(setIsGameFlowAlertVisible(false))}
    />
  );
};

export default GameFlowAlert;
