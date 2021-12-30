import { UiButton } from '@/components/ui';
import { CoinSide } from '@/constants/coinflip';
import { getCoinSideIcon } from '@/utils/coinflip';
import { Space, Tooltip } from 'antd';
import { FC } from 'react';
import { AmountDisplay, BaseGameCard, CentralContent } from '../../../shared';
import { useCardShared } from '../../hooks';
import { PendingGameCardProps } from '../../types';

const PendingGameCard: FC<PendingGameCardProps> = (props) => {
  const { game } = props;

  const {
    canAcceptGame,
    acceptGameBlockedReason,
    isCurrentUserCreatorOfGame,
    getCardTitle,
    cardStatus,
    getTooltipContent,
    signText,
    footerLink,
    acceptGame,
    cancelGame,
  } = useCardShared(props);

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
              <UiButton uppercase type="primary" size="small" shape="round" onClick={cancelGame}>
                Cancel game
              </UiButton>
            )}

            {!isCurrentUserCreatorOfGame && (
              <Tooltip title={acceptGameBlockedReason} zIndex={1} placement="bottom">
                <Space direction="vertical" size={6}>
                  <UiButton
                    disabled={!canAcceptGame}
                    uppercase
                    type="primary"
                    theme="coin-heads"
                    size="small"
                    shape="round"
                    style={{ width: '100%' }}
                    onClick={() => acceptGame(CoinSide.Heads)}
                  >
                    <Space size={6}>
                      Play bulls
                      <div className="flex flex-align-center">
                        <HeadsIcon style={{ fill: '#ffffff', width: '16px' }} />
                      </div>
                    </Space>
                  </UiButton>

                  <UiButton
                    disabled={!canAcceptGame}
                    uppercase
                    type="primary"
                    theme="coin-tails"
                    size="small"
                    shape="round"
                    style={{ width: '100%' }}
                    onClick={() => acceptGame(CoinSide.Tails)}
                  >
                    <Space size={6}>
                      Play bears
                      <div className="flex flex-align-center">
                        <TailsIcon style={{ fill: '#ffffff', width: '16px' }} />
                      </div>
                    </Space>
                  </UiButton>
                </Space>
              </Tooltip>
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
