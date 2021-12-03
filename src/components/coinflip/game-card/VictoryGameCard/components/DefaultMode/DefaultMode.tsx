import { APP_SUCCESS_COLOR } from '@/assets/styles/design';
import { FC } from 'react';
import { BaseGameCard, CentralContent, FooterLink, ImageArea } from '../../../shared';
import { useCardShared } from '../../hooks';
import { VictoryGameCardProps } from '../../types';

const VictoryGameCard: FC<VictoryGameCardProps> = (props) => {
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
    transactionLink,
    CardStatusStyled,
  } = useCardShared(props);

  return (
    <BaseGameCard
      gameId={'535fa30d7e25dd8a49f1536779734ec8286108d115da5045d77f3b4185d8f790'}
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
      footer={<FooterLink url={transactionLink} />}
    />
  );
};

export default VictoryGameCard;
