import { ReactComponent as LunaLogo } from '@/assets/images/tokens/LUNA.svg';
import { APP_SUCCESS_COLOR } from '@/assets/styles/design';
import { UiButton } from '@/components/ui';
import { CoinSide } from '@/constants/coinflip';
import { getCoinSideIcon } from '@/utils/coinflip';
import { FC } from 'react';
import { AmountDisplay, BaseGameCard, CentralContent, FooterLink, ImageArea } from '../../../shared';
import { useCardShared } from '../../hooks';
import { PublicLiquidationGameCardProps } from '../../types';

const PublicLiquidationGameCard: FC<PublicLiquidationGameCardProps> = (props) => {
  const { cardTitle, cardStatus, signText, tooltipContent, transactionLink } = useCardShared(props);

  const HeadsIcon = getCoinSideIcon(CoinSide.Heads);
  const TailsIcon = getCoinSideIcon(CoinSide.Tails);

  return (
    <BaseGameCard
      gameId={'535fa30d7e25dd8a49f1536779734ec8286108d115da5045d77f3b4185d8f790'}
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
            <UiButton uppercase type="primary" size="small" shape="round">
              Liquidate
            </UiButton>
          }
        >
          <AmountDisplay amount={0.0007} symbol="LUNA" logo={<LunaLogo />} />
        </CentralContent>
      }
      rightContent={
        <ImageArea>
          <TailsIcon />
        </ImageArea>
      }
      infoTooltip={tooltipContent}
      footer={<FooterLink url={transactionLink} />}
    />
  );
};

export default PublicLiquidationGameCard;
