import { UiButton } from '@/components/ui';
import { CoinSide } from '@/constants/coinflip';
import { getCoinSideColor, getCoinSideIcon } from '@/utils/coinflip';
import { FC } from 'react';
import styled from 'styled-components';
import { AmountDisplay, BaseGameCard, CentralContent, ImageArea } from '../../../shared';
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
            <div className="play-button">
              <UiButton uppercase shape="round" type="primary" size="small" style={{ width: '90px', fontSize: '10px' }}>
                Play bulls
              </UiButton>
            </div>
          )}
        </SideStyled>
      }
      centerContent={
        <CentralContent
          signTextUppercase
          signText={signText}
          actionContent={
            isCurrentUserCreatorOfGame && (
              <UiButton uppercase type="primary" size="small" shape="round">
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
            <div className="play-button">
              <UiButton uppercase shape="round" type="primary" size="small" style={{ width: '90px', fontSize: '10px' }}>
                Play bears
              </UiButton>
            </div>
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
