import { UiButton } from '@/components/ui';
import { CoinSide } from '@/constants/coinflip';
import { getCoinSideIcon } from '@/utils/coinflip';
import { Space } from 'antd';
import { FC } from 'react';
import { AmountDisplay, BaseGameCard, CentralContent } from '../../../shared';
import { useCardShared } from '../../hooks';
import { PendingGameCardProps } from '../../types';

const PendingGameCard: FC<PendingGameCardProps> = (props) => {
  const { game } = props;

  const { isCurrentUserCreatorOfGame, getCardTitle, cardStatus, getTooltipContent, signText, footerLink } =
    useCardShared(props);

  const HeadsIcon = getCoinSideIcon(CoinSide.Heads);
  const TailsIcon = getCoinSideIcon(CoinSide.Tails);

  return (
    <BaseGameCard
      gameId={game.id}
      mode="compact"
      title={getCardTitle()}
      subtitle={cardStatus}
      centerContent={
        <CentralContent signTextUppercase signText={signText}>
          <Space direction="vertical" align="center">
            <AmountDisplay tokenSymbol={game.asset.denom} uAmount={game.asset.amount} />

            {isCurrentUserCreatorOfGame && (
              <UiButton uppercase type="primary" size="small" shape="round">
                Cancel game
              </UiButton>
            )}

            {!isCurrentUserCreatorOfGame && (
              <Space direction="vertical" size={6}>
                <UiButton
                  uppercase
                  type="primary"
                  theme="coin-heads"
                  size="small"
                  shape="round"
                  style={{ width: '100%' }}
                >
                  <Space size={6}>
                    Play bulls
                    <div className="flex flex-align-center">
                      <HeadsIcon style={{ fill: '#ffffff', width: '16px' }} />
                    </div>
                  </Space>
                </UiButton>

                <UiButton
                  uppercase
                  type="primary"
                  theme="coin-tails"
                  size="small"
                  shape="round"
                  style={{ width: '100%' }}
                >
                  <Space size={6}>
                    Play bears
                    <div className="flex flex-align-center">
                      <TailsIcon style={{ fill: '#ffffff', width: '16px' }} />
                    </div>
                  </Space>
                </UiButton>
              </Space>
            )}
          </Space>
        </CentralContent>
      }
      infoTooltip={getTooltipContent()}
      footer={footerLink}
    />
  );
};

export default PendingGameCard;
