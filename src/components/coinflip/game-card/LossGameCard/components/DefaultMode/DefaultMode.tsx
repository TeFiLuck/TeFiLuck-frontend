import { APP_DANGER_COLOR } from '@/assets/styles/design';
import { FC } from 'react';
import { BaseGameCard, CentralContent, FooterLink, ImageArea } from '../../../shared';
import { useCardShared } from '../../hooks';
import { LossGameCardProps } from '../../types';

const LossGameCard: FC<LossGameCardProps> = (props) => {
  const {
    OpponentChoiceIcon,
    opponentChoiceColor,
    cardTitle,
    getCardStatus,
    getCardSignText,
    getMyChoiceIcon,
    getMyChoiceIconColor,
    getMyChoiceBorderColor,
    amountDisplay,
    transactionLink,
    CardStatusStyled,
  } = useCardShared(props);

  return (
    <BaseGameCard
      gameId={'535fa30d7e25dd8a49f1536779734ec8286108d115da5045d77f3b4185d8f790'}
      decorLinesColor={APP_DANGER_COLOR}
      title={cardTitle}
      subtitle={<CardStatusStyled>{getCardStatus()}</CardStatusStyled>}
      leftContent={
        <ImageArea imageColor={getMyChoiceIconColor()} borderColor={getMyChoiceBorderColor()}>
          {getMyChoiceIcon()}
        </ImageArea>
      }
      centerContent={<CentralContent signText={getCardSignText()}>{amountDisplay}</CentralContent>}
      rightContent={
        <ImageArea imageColor={opponentChoiceColor} borderColor={opponentChoiceColor}>
          <OpponentChoiceIcon />
        </ImageArea>
      }
      footer={<FooterLink url={transactionLink} />}
    />
  );
};

export default LossGameCard;
