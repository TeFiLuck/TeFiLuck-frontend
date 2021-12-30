import { APP_SUCCESS_COLOR_RGB_STRING } from '@/assets/styles/design';
import { UiButton } from '@/components/ui';
import { Space, Tooltip } from 'antd';
import { FC } from 'react';
import { AmountDisplay, BaseGameCard, CentralContent } from '../../../shared';
import { useCardShared } from '../../hooks';
import { PublicLiquidationGameCardProps } from '../../types';

const PublicLiquidationGameCard: FC<PublicLiquidationGameCardProps> = (props) => {
  const { game } = props;
  const {
    liquidationBlockedReason,
    isLiquidationAllowed,
    cardTitle,
    cardStatus,
    signText,
    tooltipContent,
    footerLink,
    gainAmount,
    liquidateGame,
  } = useCardShared(props);

  return (
    <BaseGameCard
      gameId={game.id}
      mode="compact"
      glowColor={`rgba(${APP_SUCCESS_COLOR_RGB_STRING}, 0.22)`}
      title={cardTitle}
      subtitle={cardStatus}
      hideLeftContent
      hideRightContent
      centerContent={
        <CentralContent signTextUppercase signText={signText}>
          <Space direction="vertical">
            <AmountDisplay tokenSymbol={game.asset.denom} uAmount={gainAmount} />

            <Tooltip title={liquidationBlockedReason} placement="bottom">
              <div>
                <UiButton
                  disabled={!isLiquidationAllowed}
                  uppercase
                  type="primary"
                  size="small"
                  shape="round"
                  onClick={liquidateGame}
                >
                  Liquidate
                </UiButton>
              </div>
            </Tooltip>
          </Space>
        </CentralContent>
      }
      infoTooltip={tooltipContent}
      footer={footerLink}
    />
  );
};

export default PublicLiquidationGameCard;
