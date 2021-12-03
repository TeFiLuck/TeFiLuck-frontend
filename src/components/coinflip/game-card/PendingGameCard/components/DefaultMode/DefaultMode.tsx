import { ReactComponent as LunaLogo } from '@/assets/images/tokens/LUNA.svg';
import { UiButton } from '@/components/ui';
import { CoinSide } from '@/constants/coinflip';
import { getCoinSideColor, getCoinSideIcon } from '@/utils/coinflip';
import { FC } from 'react';
import styled from 'styled-components';
import { AmountDisplay, BaseGameCard, CentralContent, FooterLink, ImageArea } from '../../../shared';
import { useCardShared } from '../../hooks';
import { PendingGameCardProps } from '../../types';

const PendingGameCard: FC<PendingGameCardProps> = (props) => {
  const { isCurrentUserCreatorOfGame } = props;

  const { getCardTitle, cardStatus, getTooltipContent, signText, transactionLink } = useCardShared(props);

  const HeadsIcon = getCoinSideIcon(CoinSide.Heads);
  const TailsIcon = getCoinSideIcon(CoinSide.Tails);

  return (
    <BaseGameCard
      gameId={'535fa30d7e25dd8a49f1536779734ec8286108d115da5045d77f3b4185d8f790'}
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
          <AmountDisplay amount={777} symbol="LUNA" logo={<LunaLogo />} />
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
      footer={<FooterLink url={transactionLink} />}
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
