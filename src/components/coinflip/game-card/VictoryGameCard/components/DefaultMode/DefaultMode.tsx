import { APP_SUCCESS_COLOR } from '@/assets/styles/design';
import { FC } from 'react';
import { BaseGameCard, CentralContent, ImageArea } from '../../../shared';
import { useCardShared } from '../../hooks';
import { VictoryGameCardProps } from '../../types';

const VictoryGameCard: FC<VictoryGameCardProps> = (props) => {
  const { game } = props;

  const {
    myChoiceColor,
    MyChoiceIcon,
    getOpponentChoiceIconColor,
    getOpponentChoiceBorderColor,
    getOpponentChoiceIcon,
    getCardTitle,
    getCardStatus,
    amountDisplay,
    signText,
    footerLink,
    CardStatusStyled,
  } = useCardShared(props);

  return (
    <BaseGameCard
      gameId={game.id}
      decorLinesColor={APP_SUCCESS_COLOR}
      title={getCardTitle()}
      subtitle={<CardStatusStyled>{getCardStatus()}</CardStatusStyled>}
      leftContent={
        <ImageArea imageColor={myChoiceColor} borderColor={myChoiceColor}>
          <MyChoiceIcon />
        </ImageArea>
      }
      centerContent={<CentralContent signText={signText}>{amountDisplay}</CentralContent>}
      rightContent={
        <ImageArea imageColor={getOpponentChoiceIconColor()} borderColor={getOpponentChoiceBorderColor()}>
          {getOpponentChoiceIcon()}
        </ImageArea>
      }
      footer={footerLink}
    />
  );
};

export default VictoryGameCard;
