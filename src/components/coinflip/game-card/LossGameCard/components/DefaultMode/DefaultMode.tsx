import { APP_DANGER_COLOR } from '@/assets/styles/design';
import { FC } from 'react';
import { BaseGameCard, CentralContent, ImageArea } from '../../../shared';
import { useCardShared } from '../../hooks';
import { LossGameCardProps } from '../../types';

const LossGameCard: FC<LossGameCardProps> = (props) => {
  const { game } = props;

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
    footerLink,
    CardStatusStyled,
  } = useCardShared(props);

  return (
    <BaseGameCard
      gameId={game.id}
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
      footer={footerLink}
    />
  );
};

export default LossGameCard;
