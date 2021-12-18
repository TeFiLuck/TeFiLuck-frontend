import { UiLink } from '@/components/ui';
import { GAME_FLOW_DESCRIPTION_ARTICLE_LINK } from '@/constants/company';
import { useMediaQueries } from '@/hooks';
import { useAppDispatch, useAppSelector } from '@/state';
import { setIsGameFlowAlertVisible } from '@/state/coinflip';
import { CloseOutlined } from '@ant-design/icons';
import { Alert } from 'antd';
import { FC } from 'react';

export interface GameFlowAlertProps {
  style?: Record<string, string>;
}

const GameFlowAlert: FC<GameFlowAlertProps> = ({ style = {} }) => {
  const dispatch = useAppDispatch();
  const { is750PxOrLess, is440PxOrLess } = useMediaQueries();
  const { isGameFlowAlertVisible } = useAppSelector((state) => state.coinflip);

  if (!isGameFlowAlertVisible) return <></>;

  return (
    <Alert
      message={
        <span>
          {!is750PxOrLess && <span>To avoid any possible confusion, please&nbsp;</span>}
          <UiLink
            to={GAME_FLOW_DESCRIPTION_ARTICLE_LINK}
            fontSize={is440PxOrLess ? '10px' : '12px'}
            mode="html"
            openHtmlLinkSeparately
            underlined
            uppercase
          >
            Read this article about game flow
          </UiLink>
        </span>
      }
      banner
      className="noselect"
      type="warning"
      closeText={<span>{is750PxOrLess ? <CloseOutlined style={{ fontSize: '14px' }} /> : 'Don\'t show again'}</span>}
      style={{ ...style }}
      onClose={() => dispatch(setIsGameFlowAlertVisible(false))}
    />
  );
};

export default GameFlowAlert;
