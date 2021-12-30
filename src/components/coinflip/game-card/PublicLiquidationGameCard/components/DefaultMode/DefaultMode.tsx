import { APP_SUCCESS_COLOR } from '@/assets/styles/design';
import { UiButton } from '@/components/ui';
import { CoinSide } from '@/constants/coinflip';
import { getCoinSideIcon } from '@/utils/coinflip';
import { Tooltip } from 'antd';
import { FC } from 'react';
import { AmountDisplay, BaseGameCard, CentralContent, ImageArea } from '../../../shared';
import { useCardShared } from '../../hooks';
import { PublicLiquidationGameCardProps } from '../../types';

const PublicLiquidationGameCard: FC<PublicLiquidationGameCardProps> = (props) => {
  const { game } = props;
  const {
    isLiquidationAllowed,
    liquidationBlockedReason,
    cardTitle,
    cardStatus,
    signText,
    tooltipContent,
    footerLink,
    gainAmount,
    liquidateGame,
  } = useCardShared(props);

  const HeadsIcon = getCoinSideIcon(CoinSide.Heads);
  const TailsIcon = getCoinSideIcon(CoinSide.Tails);

  return (
    <BaseGameCard
      gameId={game.id}
      decorLinesColor={APP_SUCCESS_COLOR}
      title={cardTitle}
      subtitle={cardStatus}
      leftContent={
        <ImageArea>
          <HeadsIcon />
        </ImageArea>
      }
      centerContent={
        <CentralContent
          signTextUppercase
          signText={signText}
          actionContent={
            <Tooltip title={liquidationBlockedReason}>
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
          }
        >
          <AmountDisplay tokenSymbol={game.asset.denom} uAmount={gainAmount} />
        </CentralContent>
      }
      rightContent={
        <ImageArea>
          <TailsIcon />
        </ImageArea>
      }
      infoTooltip={tooltipContent}
      footer={footerLink}
    />
  );
};

export default PublicLiquidationGameCard;
