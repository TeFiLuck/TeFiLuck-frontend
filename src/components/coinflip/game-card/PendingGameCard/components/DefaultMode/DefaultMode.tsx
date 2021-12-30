import { UiButton } from '@/components/ui';
import { CoinSide } from '@/constants/coinflip';
import { getCoinSideColor, getCoinSideIcon } from '@/utils/coinflip';
import { Tooltip } from 'antd';
import { FC } from 'react';
import styled from 'styled-components';
import { AmountDisplay, BaseGameCard, CentralContent, ImageArea } from '../../../shared';
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
      leftDecorLineColor={isCurrentUserCreatorOfGame ? 'transparent' : getCoinSideColor(CoinSide.Heads)}
      rightDecorLineColor={isCurrentUserCreatorOfGame ? 'transparent' : getCoinSideColor(CoinSide.Tails)}
      title={getCardTitle()}
      subtitle={cardStatus}
      leftContent={
        <SideStyled>
          <ImageArea>
            <HeadsIcon />
          </ImageArea>

          {!isCurrentUserCreatorOfGame && (
            <Tooltip title={acceptGameBlockedReason} zIndex={1}>
              <div className="play-button">
                <UiButton
                  disabled={!canAcceptGame}
                  uppercase
                  shape="round"
                  type="primary"
                  size="small"
                  style={{ width: '90px', fontSize: '10px' }}
                  onClick={() => acceptGame(CoinSide.Heads)}
                >
                  Play bulls
                </UiButton>
              </div>
            </Tooltip>
          )}
        </SideStyled>
      }
      centerContent={
        <CentralContent
          signTextUppercase
          signText={signText}
          actionContent={
            isCurrentUserCreatorOfGame && (
              <UiButton uppercase type="primary" size="small" shape="round" onClick={cancelGame}>
                Cancel game
              </UiButton>
            )
          }
        >
          <AmountDisplay tokenSymbol={game.asset.denom} uAmount={game.asset.amount} />
        </CentralContent>
      }
      rightContent={
        <SideStyled>
          <ImageArea>
            <TailsIcon />
          </ImageArea>

          {!isCurrentUserCreatorOfGame && (
            <Tooltip title={acceptGameBlockedReason} zIndex={1}>
              <div className="play-button">
                <UiButton
                  disabled={!canAcceptGame}
                  uppercase
                  shape="round"
                  type="primary"
                  size="small"
                  style={{ width: '90px', fontSize: '10px' }}
                  onClick={() => acceptGame(CoinSide.Tails)}
                >
                  Play bears
                </UiButton>
              </div>
            </Tooltip>
          )}
        </SideStyled>
      }
      infoTooltip={getTooltipContent()}
      footer={footerLink}
    />
  );
};

const SideStyled = styled.div`
  position: relative;

  .play-button {
    position: absolute;
    text-align: center;
    width: 100%;
    bottom: -14px;
  }
`;

export default PendingGameCard;
